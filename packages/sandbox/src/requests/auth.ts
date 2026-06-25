import { RequestDefinition, z } from '@simapi/simapi';

export const loginRequest: RequestDefinition = {
  body: {
    email: z.string().email(),
    password: z.string().min(6),
  },
};

export const registerRequest: RequestDefinition = {
  body: {
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string(),
    first_name: z.string().optional().nullable(),
    middle_name: z.string().optional().nullable(),
    last_name: z.string().optional().nullable(),
    username: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
  },
};

export const socialExchangeTokenRequest: RequestDefinition = {
  body: {
    access_token: z.string().min(10),
  },
};

export const updateProfileRequest: RequestDefinition = {
  body: {
    first_name: z.string().optional().nullable(),
    middle_name: z.string().optional().nullable(),
    last_name: z.string().optional().nullable(),
    username: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    email: z.string().email().optional(),
    password: z.string().min(8).optional().nullable(),
    password_confirmation: z.string().optional().nullable(),
    avatar_id: z.string().optional().nullable(),
  },
};
