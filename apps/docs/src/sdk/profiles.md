# Profiles

Profile methods live on `client.profile.personal` and `client.profile.business`. A space can host multiple personal and business profiles, each acting as a rich, portfolio-grade page.

## Personal profiles

### List personal profiles

```ts
const response = await client.profile.personal.list({
  search: "Jane",
  availability: "open_to_work",
  sort: "featured",
  per_page: 15,
  page: 1,
});

const { data: profiles, meta } = response.data;
// profiles: PersonalProfile[]
// meta: { currentPage, lastPage, perPage, total }
```

#### Query parameters

| Param          | Type     | Description                                                 |
| -------------- | -------- | ----------------------------------------------------------- |
| `search`       | `string` | Filter by name or tagline                                   |
| `availability` | `string` | `'open_to_work'` \| `'freelancing'` \| `'not_available'`    |
| `sort`         | `string` | `'name_asc'` \| `'name_desc'` \| `'featured'` \| `'latest'` |
| `per_page`     | `number` | Items per page — default `15`                               |
| `page`         | `number` | Page number (1-indexed) — default `1`                       |

### Get a personal profile

The identifier can be a ULID, slug, email address, or phone number.

```ts
const response = await client.profile.personal.get("jane-doe-0");
const profile = response.data;

console.log(profile.fullName); // "Jane Doe" or display_name
console.log(profile.availability); // "open_to_work"
console.log(profile.gravatarUrl); // Gravatar URL or null

// Detail relations (loaded on get, not on list)
profile.educations; // PersonalProfileEducation[]
profile.experiences; // PersonalProfileExperience[]
profile.skills; // PersonalProfileSkill[]
profile.projects; // PersonalProfileProject[]
profile.certifications; // PersonalProfileCertification[]
profile.awards; // PersonalProfileAward[]
profile.publications; // PersonalProfilePublication[]
profile.languages; // PersonalProfileLanguage[]
profile.volunteering; // PersonalProfileVolunteering[]
```

### `PersonalProfile` resource

| Property                 | Type                  | Description                                     |
| ------------------------ | --------------------- | ----------------------------------------------- |
| `id`                     | `string`              | ULID                                            |
| `slug`                   | `string`              | URL-safe identifier                             |
| `firstName` / `lastName` | `string`              | Given and family names                          |
| `displayName`            | `string \| null`      | Preferred display name                          |
| `fullName`               | `string`              | Computed: `displayName ?? firstName + lastName` |
| `tagline`                | `string \| null`      | Short headline                                  |
| `bio`                    | `string \| null`      | Long bio                                        |
| `location`               | `string \| null`      | City / region                                   |
| `website`                | `string \| null`      | Personal site URL                               |
| `gravatarUrl`            | `string \| null`      | Computed Gravatar URL (`?s=400&d=mp`)           |
| `availability`           | `string \| null`      | Availability status                             |
| `hobbies`                | `string[]`            | List of hobbies                                 |
| `interests`              | `string[]`            | List of interests                               |
| `openTo`                 | `string[]`            | Opportunities the person is open to             |
| `socialLinks`            | `{ platform, url }[]` | Social link entries                             |
| `status`                 | `string`              | `'draft'` \| `'active'` \| `'inactive'`         |
| `visibility`             | `string`              | `'public'` \| `'private'`                       |
| `isFeatured`             | `boolean`             | Whether featured                                |

---

## Business profiles

### List business profiles

```ts
const response = await client.profile.business.list({
  search: "Acme",
  industry: "Technology",
  sort: "featured",
  per_page: 15,
  page: 1,
});

const { data: profiles, meta } = response.data;
// profiles: BusinessProfile[]
```

#### Query parameters

| Param           | Type     | Description                                                 |
| --------------- | -------- | ----------------------------------------------------------- |
| `search`        | `string` | Filter by name, tagline, or description                     |
| `industry`      | `string` | Filter by industry                                          |
| `business_type` | `string` | Filter by business type                                     |
| `sort`          | `string` | `'name_asc'` \| `'name_desc'` \| `'featured'` \| `'latest'` |
| `per_page`      | `number` | Items per page — default `15`                               |
| `page`          | `number` | Page number (1-indexed) — default `1`                       |

### Get a business profile

```ts
const response = await client.profile.business.get("acme-corp-0");
const profile = response.data;

console.log(profile.name); // "Acme Corp"
console.log(profile.industry); // "Technology"
console.log(profile.gravatarUrl); // Gravatar URL or null

// Detail relations (loaded on get, not on list)
profile.services; // BusinessProfileServiceItem[]
profile.teamMembers; // BusinessProfileTeamMember[]
profile.gallery; // BusinessProfileGallery[]
profile.awards; // BusinessProfileAward[]
profile.clients; // BusinessProfileClient[]
profile.milestones; // BusinessProfileMilestone[]
profile.hours; // BusinessProfileHour[]
profile.faqs; // BusinessProfileFaq[]
profile.caseStudies; // BusinessProfileCaseStudy[]
```

### `BusinessProfile` resource

| Property                     | Type                  | Description                             |
| ---------------------------- | --------------------- | --------------------------------------- |
| `id`                         | `string`              | ULID                                    |
| `slug`                       | `string`              | URL-safe identifier                     |
| `name`                       | `string`              | Business name                           |
| `tagline`                    | `string \| null`      | Short tagline                           |
| `description`                | `string \| null`      | Full description                        |
| `industry`                   | `string \| null`      | Industry                                |
| `businessType`               | `string \| null`      | Type of business                        |
| `foundedYear`                | `number \| null`      | Year established                        |
| `employeeRange`              | `string \| null`      | Employee count range                    |
| `website`                    | `string \| null`      | Website URL                             |
| `gravatarUrl`                | `string \| null`      | Computed Gravatar URL                   |
| `city` / `state` / `country` | `string \| null`      | Address components                      |
| `socialLinks`                | `{ platform, url }[]` | Social link entries                     |
| `status`                     | `string`              | `'draft'` \| `'active'` \| `'inactive'` |
| `visibility`                 | `string`              | `'public'` \| `'private'`               |
| `isFeatured`                 | `boolean`             | Whether featured                        |

---

## Identifier resolution

For both `get()` calls, the server resolves the identifier in this order:

1. **ULID** — exact match on `id`
2. **Slug** — exact match on `slug`
3. **Email** — if the string contains `@`
4. **Phone** — if the string starts with `+` or is all digits

Private profiles are excluded from `list()` but still resolvable via `get()` if the identifier is known.
