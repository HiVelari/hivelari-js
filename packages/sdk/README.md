# @hivelari/sdk

Official TypeScript SDK for the HiVelari platform. Server-only — never import this in browser code.

## Installation

```bash
pnpm add @hivelari/sdk
```

## Environment variables

| Variable            | Required | Description                                          |
| ------------------- | -------- | ---------------------------------------------------- |
| `VELARI_SPACE_ID`   | ✓        | Your HiVelari space identifier                       |
| `VELARI_PUBLIC_KEY` | ✓        | Space public key                                     |
| `VELARI_SECRET_KEY` | ✓        | Space secret key — keep server-side only             |
| `VELARI_API_URL`    | —        | API base URL. Defaults to `https://api.hivelari.com` |

## Quick example

```ts
import { Velari } from "@hivelari/sdk";

const client = new Velari();

// Authentication
const { data } = await client.auth.login({ email, password });

// Commerce (first available domain)
const products = await client.commerce.listProducts({ page: 1 });

// Shared records
const categories = await client.records.getCategories();
const currencies = await client.records.getCurrencies();
```

## Full documentation

Complete API reference, parameter tables, and examples at **[sdk.hivelari.com](https://sdk.hivelari.com)**.

## Contributing

PRs and issues welcome at [github.com/HiVelari/hivelari-js](https://github.com/HiVelari/hivelari-js).
