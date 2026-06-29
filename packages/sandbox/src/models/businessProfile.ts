import { faker } from '@simapi/simapi';

faker.seed(202);

export interface BusinessProfileModel {
  id: string;
  slug: string;
  email: string | null;
  phone: string | null;
  name: string;
  tagline: string | null;
  description: string | null;
  industry: string | null;
  business_type: string | null;
  founded_year: number | null;
  employee_range: string | null;
  registration_number: string | null;
  tax_id: string | null;
  website: string | null;
  support_email: string | null;
  support_phone: string | null;
  logo_id: string | null;
  cover_id: string | null;
  gravatar_url: string | null;
  address_line_1: string | null;
  address_line_2: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postal_code: string | null;
  social_links: { platform: string; url: string }[];
  status: string;
  visibility: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  services: {
    id: string;
    name: string;
    description: string | null;
    price_from: number | null;
    price_to: number | null;
    currency: string | null;
    duration: string | null;
    cover_id: string | null;
    is_featured: boolean;
    position: number;
  }[];
  team_members: {
    id: string;
    personal_profile_id: string | null;
    name: string | null;
    role: string;
    bio: string | null;
    avatar_id: string | null;
    is_featured: boolean;
    position: number;
  }[];
  gallery: {
    id: string;
    media_id: string;
    caption: string | null;
    alt: string | null;
    position: number;
  }[];
  awards: {
    id: string;
    title: string;
    issuer: string;
    date: string | null;
    description: string | null;
    url: string | null;
    badge_id: string | null;
    position: number;
  }[];
  clients: {
    id: string;
    name: string;
    type: string;
    logo_id: string | null;
    url: string | null;
    description: string | null;
    position: number;
  }[];
  milestones: {
    id: string;
    title: string;
    description: string | null;
    date: string;
    icon: string | null;
    position: number;
  }[];
  hours: {
    id: string;
    day: string;
    open_time: string | null;
    close_time: string | null;
    is_closed: boolean;
    note: string | null;
  }[];
  faqs: { id: string; question: string; answer: string; position: number }[];
  case_studies: {
    id: string;
    title: string;
    client_name: string | null;
    summary: string | null;
    outcome: string | null;
    url: string | null;
    cover_id: string | null;
    tags: string[];
    is_featured: boolean;
    position: number;
  }[];
}

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Retail',
  'Manufacturing',
  'Media',
];
const businessTypes = ['startup', 'sme', 'enterprise', 'nonprofit', 'agency'];
const employeeRanges = ['1-10', '11-50', '51-200', '201-500', '500+'];
const weekDays = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];
const clientTypes = ['client', 'partner', 'sponsor'];

function makeId() {
  return faker.string.ulid();
}

function makeProfile(index: number): BusinessProfileModel {
  const name = faker.company.name();
  const slug = `${name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}-${index}`;

  return {
    id: makeId(),
    slug,
    email: faker.internet.email(),
    phone: null,
    name,
    tagline: faker.company.catchPhrase(),
    description: faker.lorem.paragraph(),
    industry: faker.helpers.arrayElement(industries),
    business_type: faker.helpers.arrayElement(businessTypes),
    founded_year: 2000 + (index % 24),
    employee_range: faker.helpers.arrayElement(employeeRanges),
    registration_number: null,
    tax_id: null,
    website: faker.internet.url(),
    support_email: faker.internet.email(),
    support_phone: null,
    logo_id: null,
    cover_id: null,
    gravatar_url: null,
    address_line_1: faker.location.streetAddress(),
    address_line_2: null,
    city: faker.location.city(),
    state: faker.location.state(),
    country: 'NG',
    postal_code: faker.location.zipCode(),
    social_links: ['linkedin', 'twitter', 'instagram'].map((p) => ({
      platform: p,
      url: faker.internet.url(),
    })),
    status: 'active',
    visibility: 'public',
    is_featured: index < 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),

    services: Array.from({ length: 3 }, (_, i) => ({
      id: makeId(),
      name: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      price_from: (index + 1) * 10000,
      price_to: (index + 1) * 20000,
      currency: 'USD',
      duration: '2 weeks',
      cover_id: null,
      is_featured: i === 0,
      position: i,
    })),

    team_members: Array.from({ length: 3 }, (_, i) => ({
      id: makeId(),
      personal_profile_id: null,
      name: faker.person.fullName(),
      role: faker.person.jobTitle(),
      bio: faker.lorem.sentence(),
      avatar_id: null,
      is_featured: i === 0,
      position: i,
    })),

    gallery: [],

    awards: [
      {
        id: makeId(),
        title: 'Best Company Award',
        issuer: faker.company.name(),
        date: '2023-06-01',
        description: faker.lorem.sentence(),
        url: null,
        badge_id: null,
        position: 0,
      },
    ],

    clients: Array.from({ length: 4 }, (_, i) => ({
      id: makeId(),
      name: faker.company.name(),
      type: faker.helpers.arrayElement(clientTypes),
      logo_id: null,
      url: faker.internet.url(),
      description: null,
      position: i,
    })),

    milestones: [
      {
        id: makeId(),
        title: 'Founded',
        description: faker.lorem.sentence(),
        date: `${2000 + (index % 24)}-01-01`,
        icon: 'rocket',
        position: 0,
      },
      {
        id: makeId(),
        title: 'First 100 clients',
        description: faker.lorem.sentence(),
        date: `${2002 + (index % 24)}-06-01`,
        icon: 'users',
        position: 1,
      },
    ],

    hours: weekDays.map((day, i) => ({
      id: makeId(),
      day,
      open_time: i < 5 ? '09:00:00' : null,
      close_time: i < 5 ? '17:00:00' : null,
      is_closed: i >= 5,
      note: null,
    })),

    faqs: [
      {
        id: makeId(),
        question: 'What services do you offer?',
        answer: faker.lorem.paragraph(),
        position: 0,
      },
      {
        id: makeId(),
        question: 'How do I get started?',
        answer: faker.lorem.paragraph(),
        position: 1,
      },
    ],

    case_studies: [
      {
        id: makeId(),
        title: `How ${faker.company.name()} grew 3x in 6 months`,
        client_name: faker.company.name(),
        summary: faker.lorem.paragraph(),
        outcome: faker.lorem.sentence(),
        url: faker.internet.url(),
        cover_id: null,
        tags: ['growth', 'strategy'],
        is_featured: true,
        position: 0,
      },
    ],
  };
}

export const mockBusinessProfiles: BusinessProfileModel[] = Array.from(
  { length: 20 },
  (_, i) => makeProfile(i),
);
