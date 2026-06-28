# What is HiVelari?

HiVelari is a **Backend as a Service** for developers. It provides a fully hosted, multi-domain API backend — user auth, commerce, bookings, content, profiles, forms, and more — so you can build real products without standing up or maintaining any server infrastructure.

You bring the frontend. HiVelari is the backend.

---

## Why HiVelari?

Every product eventually needs the same set of backend capabilities. You need users, you need content, you need a way to take payments or accept bookings. Building these from scratch — even with good tools — takes months. Stitching together separate services (auth, a payment processor, a CMS, a booking engine) takes even longer and leaves you owning the glue.

HiVelari puts all of that under one API, one SDK, and one dashboard. You configure your space, set your env vars, and start building the parts of your product that are actually unique.

---

## Domains

HiVelari is structured around **domains** — independent feature areas that each expose a focused API. Every domain shares the same auth layer, the same media system, and the same cross-domain records.

Commerce is the first fully implemented domain (the current POC). The remaining domains are in active development and will be progressively released.

| Domain               | Description                                                     | Status         |
| -------------------- | --------------------------------------------------------------- | -------------- |
| **Commerce**         | Product catalog, variants, pricing, digital delivery, orders    | ✅ Available   |
| **Booking**          | Appointments, schedules, calendar availability, slot management | 🔜 Coming soon |
| **Blog**             | Post publishing, rich content, categories, tags, comments       | 🔜 Coming soon |
| **Personal Profile** | Portfolios, skills, career history, education                   | 🔜 Coming soon |
| **Business Profile** | Company info, services, employee data                           | 🔜 Coming soon |
| **Forms**            | Contact forms, lead capture, survey submissions                 | 🔜 Coming soon |
| **Polls**            | Surveys, vote counts, result aggregation                        | 🔜 Coming soon |
| **Waitlist**         | Early-access signups, positions, referral tracking              | 🔜 Coming soon |
| **Reviews**          | Ratings for products or services, aggregate averages            | 🔜 Coming soon |
| **Testimonials**     | Curated endorsement quotes, author and role metadata            | 🔜 Coming soon |

---

## Auth

Auth is not a domain — it is a **platform-wide service**. Every space gets a full auth system: registration, login, social OAuth, email verification, and password recovery. All domain APIs are auth-aware and scope data to the authenticated user automatically.

---

## Shared infrastructure

Two systems run underneath all domains and are not exposed as standalone APIs:

**Media** — A centralised file management service. Domains use it internally to store and serve assets (avatars, product images, attachments). You interact with media through the entity that owns it — for example, uploading a user avatar via the profile API.

**Records** — Shared lookup data that is meaningful across domains: currencies, product categories, and similar reference tables. These are queried via `client.records` and are designed to stay consistent across your entire space.

---

## Spaces

Everything in HiVelari is scoped to a **space** — an isolated environment with its own users, data, and API keys. Use separate spaces for staging and production. Multi-tenant architectures can provision one space per tenant.

Your credentials (`VELARI_SPACE_ID`, `VELARI_PUBLIC_KEY`, `VELARI_SECRET_KEY`) identify which space the SDK connects to.

---

## How the SDK fits in

```
Your Next.js App (or any Node.js server)
    │
    ├── @hivelari/nextjs   ← session management, middleware, OAuth helpers
    │       │
    └── @hivelari/sdk      ← typed API client for all domains
                │
                └── HiVelari API  ↔  HiVelari Platform
```

During development, [@hivelari/sandbox](/sandbox/overview) replaces the live API with a local mock server so you can work offline.

Ready to build? → [Getting Started](/hello/getting-started)
