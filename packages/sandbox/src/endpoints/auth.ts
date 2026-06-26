import crypto from "node:crypto";
import { type AuthUser, makeUser, sessionsDb, usersDb } from "@models/user.js";
import {
  loginRequest,
  registerRequest,
  socialExchangeTokenRequest,
  updateProfileRequest,
} from "@requests/auth.js";
import {
  type AppRequest,
  AppResponse,
  type EndpointDefinition,
  faker,
} from "@simapi/simapi";

function encryptNode(data: string, secret: string): string {
  const keyBuf = Buffer.alloc(32);
  const srcBuf = Buffer.from(secret, "utf8");
  srcBuf.copy(keyBuf, 0, 0, Math.min(srcBuf.length, 32));

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", keyBuf, iv);
  let encrypted = cipher.update(data, "utf8");
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return Buffer.concat([iv, encrypted]).toString("base64");
}

// Helper to authenticate session token in secure routes
function getAuthenticatedUser(
  req: AppRequest,
): { user: AuthUser; token: string } | null {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  const token = authHeader.substring(7);
  const email = sessionsDb.get(token);
  if (!email) {
    return null;
  }
  const user = usersDb.get(email);
  if (!user) {
    return null;
  }
  return { user, token };
}

// 1. POST /api/auth/v1/register
export const postRegister: EndpointDefinition = {
  path: "/api/auth/v1/register",
  method: "POST",
  type: "secure",
  title: "Register Client Profile",
  description: "Create a new client profile under the current space.",
  request: registerRequest,
  handler: (req: AppRequest) => {
    const email = req.body<string>("email")!;
    const password = req.body<string>("password")!;
    const passwordConf = req.body<string>("password_confirmation")!;

    if (password !== passwordConf) {
      return AppResponse.custom(422, {
        message: "The password confirmation does not match.",
        errors: { password: ["The password confirmation does not match."] },
      });
    }

    if (usersDb.has(email)) {
      return AppResponse.custom(422, {
        message: "The email has already been taken.",
        errors: { email: ["The email has already been taken."] },
      });
    }

    const first = req.body<string>("first_name") || null;
    const middle = req.body<string>("middle_name") || null;
    const last = req.body<string>("last_name") || null;
    const username = req.body<string>("username") || null;
    const phone = req.body<string>("phone") || null;

    const user = makeUser({
      first_name: first,
      middle_name: middle,
      last_name: last,
      username,
      email,
      phone,
      password,
    });

    const token = `hvl_tok_${faker.string.alphanumeric(32)}`;
    sessionsDb.set(token, email);

    // Remove password hash from payload
    const { password: _, ...userPayload } = user;

    return AppResponse.created({
      token,
      user: userPayload,
    });
  },
};

// 2. POST /api/auth/v1/login
export const postLogin: EndpointDefinition = {
  path: "/api/auth/v1/login",
  method: "POST",
  type: "secure",
  title: "Client Login",
  description: "Authenticate client credentials and return an access token.",
  request: loginRequest,
  handler: (req: AppRequest) => {
    const email = req.body<string>("email")!;
    const password = req.body<string>("password")!;

    const user = usersDb.get(email);
    if (!user || user.password !== password) {
      return AppResponse.custom(401, {
        message: "These credentials do not match our records.",
      });
    }

    const token = `hvl_tok_${faker.string.alphanumeric(32)}`;
    sessionsDb.set(token, email);

    const { password: _, ...userPayload } = user;

    return AppResponse.success({
      token,
      user: userPayload,
    });
  },
};

// 3. GET /api/auth/v1/social/:provider/redirect-url
export const getSocialRedirectUrl: EndpointDefinition = {
  path: "/api/auth/v1/social/:provider/redirect-url",
  method: "GET",
  type: "secure",
  title: "Get Social Authorization Link",
  description:
    "Retrieve Oauth authorization redirect URL for the specified provider.",
  handler: (req: AppRequest) => {
    const provider = req.urlParam("provider") || "google";
    const redirectUrl = req.param("redirect_url");
    const secKey = req.header("X-HVL-SECKEY") || "mock-secret";

    if (!redirectUrl) {
      return AppResponse.custom(422, {
        message: "The redirect_url query parameter is required.",
      });
    }

    const mockRedirect = `http://localhost:3001/api/_social-auth?redirect_url=${encodeURIComponent(
      redirectUrl,
    )}&provider=${encodeURIComponent(provider)}&client_seckey=${encodeURIComponent(secKey)}`;

    return AppResponse.success({
      redirect_url: mockRedirect,
    });
  },
};

// GET /api/_social-auth
export const getSocialAuthMock: EndpointDefinition = {
  path: "/api/_social-auth",
  method: "GET",
  type: "secure",
  title: "Social Auth Mock Screen",
  description:
    "Simulates third-party identity callback return containing encrypted auth credentials code.",
  handler: (req: AppRequest) => {
    const redirectUrl = req.param("redirect_url");
    const clientSecKey = req.param("client_seckey");
    const provider = req.param("provider") || "google";

    if (!redirectUrl || !clientSecKey) {
      return AppResponse.custom(400, {
        message:
          "Missing required query parameters: redirect_url, client_seckey",
      });
    }

    // Generate mock social login client profile
    const email = `social.${provider}.${faker.string.alphanumeric(6)}@example.com`;
    const user = makeUser({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email,
    });

    const token = `hvl_tok_${faker.string.alphanumeric(32)}`;
    sessionsDb.set(token, email);

    const { password: _, ...userPayload } = user;
    const payload = JSON.stringify({
      token,
      user: userPayload,
      expires_at: Math.floor(Date.now() / 1000) + 300, // 1 minute expiry
    });

    const code = encryptNode(payload, clientSecKey);

    const separator = redirectUrl.includes("?") ? "&" : "?";
    const finalUrl = `${redirectUrl}${separator}code=${encodeURIComponent(code)}`;

    return AppResponse.success({
      message: "Sandbox Social Auth Mock Success",
      redirect_url: finalUrl,
    });
  },
};

// 4. POST /api/auth/v1/social/:provider/exchange-token
export const postSocialExchange: EndpointDefinition = {
  path: "/api/auth/v1/social/:provider/exchange-token",
  method: "POST",
  type: "secure",
  title: "Exchange Social Auth Token",
  description:
    "Exchange provider access token for a local client authentication token.",
  request: socialExchangeTokenRequest,
  handler: (req: AppRequest) => {
    const provider = req.urlParam("provider") || "google";
    const email = `social.${provider}.${faker.string.alphanumeric(6)}@example.com`;

    const user = makeUser({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email,
    });

    const token = `hvl_tok_${faker.string.alphanumeric(32)}`;
    sessionsDb.set(token, email);

    const { password: _, ...userPayload } = user;

    return AppResponse.success({
      token,
      user: userPayload,
    });
  },
};

// 5. POST /api/auth/v1/password-recovery/initiate
export const postPasswordRecoveryInitiate: EndpointDefinition = {
  path: "/api/auth/v1/password-recovery/initiate",
  method: "POST",
  type: "secure",
  title: "Initiate Password Reset",
  description:
    "Send password recovery instructions to the specified email address.",
  handler: (_req: AppRequest) => {
    return AppResponse.success({
      success: true,
    });
  },
};

// 6. POST /api/auth/v1/logout
export const postLogout: EndpointDefinition = {
  path: "/api/auth/v1/logout",
  method: "POST",
  type: "secure",
  title: "Client Logout",
  description: "Revoke the client token and invalidate the session.",
  handler: (req: AppRequest) => {
    const session = getAuthenticatedUser(req);
    if (!session) {
      return AppResponse.unauthenticated({ message: "Unauthenticated." });
    }

    sessionsDb.delete(session.token);

    return AppResponse.success({
      success: true,
    });
  },
};

// 7. POST /api/auth/v1/email-verification/initiate
export const postEmailVerificationInitiate: EndpointDefinition = {
  path: "/api/auth/v1/email-verification/initiate",
  method: "POST",
  type: "secure",
  title: "Send Email Verification Link",
  description:
    "Initiate email confirmation workflows for active client session.",
  handler: (req: AppRequest) => {
    const session = getAuthenticatedUser(req);
    if (!session) {
      return AppResponse.unauthenticated({ message: "Unauthenticated." });
    }

    return AppResponse.success({
      success: true,
    });
  },
};

// 8. GET /api/auth/v1/profile
export const getProfile: EndpointDefinition = {
  path: "/api/auth/v1/profile",
  method: "GET",
  type: "secure",
  title: "Get Profile Profile",
  description: "Retrieve authenticated client profile details.",
  handler: (req: AppRequest) => {
    const session = getAuthenticatedUser(req);
    if (!session) {
      return AppResponse.unauthenticated({ message: "Unauthenticated." });
    }

    const { password: _, ...userPayload } = session.user;

    return AppResponse.success({
      data: userPayload,
    });
  },
};

// 9. PUT /api/auth/v1/profile
export const putProfile: EndpointDefinition = {
  path: "/api/auth/v1/profile",
  method: "PUT",
  type: "secure",
  title: "Update Profile Profile",
  description: "Modify account properties on active client profile.",
  request: updateProfileRequest,
  handler: (req: AppRequest) => {
    const session = getAuthenticatedUser(req);
    if (!session) {
      return AppResponse.unauthenticated({ message: "Unauthenticated." });
    }

    const user = session.user;
    const body = req.bodyAll<Record<string, any>>();

    if (body.first_name !== undefined) user.first_name = body.first_name;
    if (body.middle_name !== undefined) user.middle_name = body.middle_name;
    if (body.last_name !== undefined) user.last_name = body.last_name;
    if (body.username !== undefined) user.username = body.username;
    if (body.phone !== undefined) user.phone = body.phone;
    if (body.email !== undefined) user.email = body.email;
    if (body.avatar_id !== undefined) user.avatar_id = body.avatar_id;

    if (body.password !== undefined) {
      if (body.password !== body.password_confirmation) {
        return AppResponse.custom(422, {
          message: "The password confirmation does not match.",
          errors: { password: ["The password confirmation does not match."] },
        });
      }
      user.password = body.password;
    }

    usersDb.set(user.email, user);

    const { password: _, ...userPayload } = user;

    return AppResponse.success({
      data: userPayload,
    });
  },
};
