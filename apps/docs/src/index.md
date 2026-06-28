---
layout: home

hero:
  name: "HiVelari"
  text: "Your backend, already built."
  tagline: HiVelari is a Backend as a Service — user auth, commerce, bookings, content, profiles, forms, and more — all behind a clean API, fully managed, ready to ship.
  image:
    src: /assets/logo.png
    alt: HiVelari
  actions:
    - theme: brand
      text: Get Started
      link: /hello/getting-started
    - theme: alt
      text: SDK Reference
      link: /sdk/overview

features:
  - icon: 🔐
    title: Auth — built in
    details: User registration, login, social OAuth, JWT sessions, email verification, and password recovery. Every domain is auth-aware out of the box.
    link: /sdk/authentication
    linkText: Auth API

  - icon: 🛒
    title: Commerce
    details: Product catalog, variants, pricing, and digital delivery. The first fully implemented domain — ready to power your storefront today.
    link: /sdk/commerce
    linkText: Commerce API

  - icon: 📅
    title: Booking
    details: Appointments, schedules, calendar availability, and slot management. Build service businesses, clinics, or any bookable experience.

  - icon: 📝
    title: Blog & Content
    details: Rich post publishing, categories, tags, and comment streams. Power your headless CMS without writing a single backend route.

  - icon: 👤
    title: Profiles
    details: Personal portfolios with skills and career history, or business profiles with services and company data — structured and API-ready.

  - icon: 📋
    title: Forms, Polls & Waitlists
    details: Collect leads, gather feedback, run surveys, and manage early-access signups. All submission data is queryable through the API.

  - icon: ⭐
    title: Reviews & Testimonials
    details: Attach ratings and endorsements to any entity in your space. Expose aggregate averages and curated quote feeds.

  - icon: 🟦
    title: TypeScript SDK
    details: Fully typed, zero-config server-side client. Install, set your env vars, and you're making API calls — no custom fetch wrappers needed.
    link: /sdk/overview
    linkText: "@hivelari/sdk"

  - icon: ⚡
    title: Next.js integration
    details: Drop-in session management, encrypted cookie hydration, social OAuth callback handler, and route middleware — pre-wired for the App Router.
    link: /nextjs/overview
    linkText: "@hivelari/nextjs"

  - icon: 🧪
    title: Local sandbox
    details: A SimAPI mock server that mirrors every HiVelari endpoint. Develop offline, run tests, and iterate without touching your live space.
    link: /sandbox/overview
    linkText: "@hivelari/sandbox"
---

## One backend. Every domain.

Most BaaS platforms stop at auth and a database. HiVelari goes further — it provides structured, opinionated APIs for the domains that real products actually need: storefronts, booking systems, blog content, profiles, and more.

You bring the frontend. HiVelari brings the backend.

```
Your app (Next.js, Node.js, or any server runtime)
    │
    ├── @hivelari/nextjs   ← session, cookies, OAuth, middleware
    │       │
    └── @hivelari/sdk      ← commerce · booking · blog · profiles · forms · …
                │
                └── HiVelari Platform  (auth · domains · media · records)
```

Each domain is independently scoped to your **space** — isolated API keys, users, and data. Spin up staging and production spaces without any configuration overlap.

[Explore the domains →](/hello/what-is-hivelari) · [Get started →](/hello/getting-started)
