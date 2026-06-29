import { faker } from '@simapi/simapi';

faker.seed(101);

export interface PersonalProfileModel {
  id: string;
  slug: string;
  email: string | null;
  phone: string | null;
  first_name: string;
  last_name: string;
  display_name: string | null;
  tagline: string | null;
  bio: string | null;
  date_of_birth: string | null;
  gender: string | null;
  pronouns: string | null;
  nationality: string | null;
  location: string;
  website: string | null;
  avatar_id: string | null;
  cover_id: string | null;
  gravatar_url: string | null;
  hobbies: string[];
  interests: string[];
  availability: string | null;
  open_to: string[];
  social_links: { platform: string; url: string }[];
  status: string;
  visibility: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  educations: {
    id: string;
    institution: string;
    degree: string;
    field_of_study: string | null;
    grade: string | null;
    description: string | null;
    start_year: number;
    end_year: number | null;
    is_current: boolean;
    position: number;
  }[];
  experiences: {
    id: string;
    company: string;
    title: string;
    employment_type: string;
    location: string | null;
    description: string | null;
    company_url: string | null;
    company_logo_id: string | null;
    start_date: string;
    end_date: string | null;
    is_current: boolean;
    position: number;
  }[];
  skills: {
    id: string;
    name: string;
    category: string | null;
    proficiency: string | null;
    position: number;
  }[];
  projects: {
    id: string;
    title: string;
    description: string | null;
    url: string | null;
    cover_id: string | null;
    tags: string[];
    start_date: string | null;
    end_date: string | null;
    is_featured: boolean;
    position: number;
  }[];
  certifications: {
    id: string;
    name: string;
    issuing_organization: string;
    issue_date: string | null;
    expiry_date: string | null;
    does_not_expire: boolean;
    credential_id: string | null;
    credential_url: string | null;
    position: number;
  }[];
  awards: {
    id: string;
    title: string;
    issuer: string;
    date: string | null;
    description: string | null;
    url: string | null;
    position: number;
  }[];
  publications: {
    id: string;
    title: string;
    type: string;
    publisher: string | null;
    publication_date: string | null;
    url: string | null;
    description: string | null;
    co_authors: string[];
    position: number;
  }[];
  languages: {
    id: string;
    language: string;
    proficiency: string;
    position: number;
  }[];
  volunteering: {
    id: string;
    organization: string;
    role: string;
    cause: string | null;
    description: string | null;
    start_date: string;
    end_date: string | null;
    is_current: boolean;
    position: number;
  }[];
}

const hobbies = [
  'Photography',
  'Hiking',
  'Reading',
  'Gaming',
  'Cooking',
  'Traveling',
  'Music',
  'Art',
];
const interests = [
  'AI',
  'Sustainability',
  'Design',
  'Open Source',
  'Entrepreneurship',
  'Education',
];
const availability = ['open_to_work', 'freelancing', 'not_available'];
const platforms = [
  'github',
  'linkedin',
  'twitter',
  'dribbble',
  'behance',
  'instagram',
];
const proficiencies = ['beginner', 'intermediate', 'advanced', 'expert'];
const langProficiencies = [
  'elementary',
  'limited_working',
  'professional_working',
  'full_professional',
  'native',
];
const employmentTypes = [
  'full_time',
  'part_time',
  'contract',
  'freelance',
  'internship',
];
const publicationTypes = [
  'article',
  'book',
  'paper',
  'blog',
  'podcast',
  'talk',
];

function makeId() {
  return faker.string.ulid();
}

function makeProfile(index: number): PersonalProfileModel {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const slug = `${firstName.toLowerCase()}-${lastName.toLowerCase()}-${index}`;
  const hasCurrent = index % 3 === 0;
  const startYear = 2015 + (index % 5);

  return {
    id: makeId(),
    slug,
    email: faker.internet.email({ firstName, lastName }),
    phone: null,
    first_name: firstName,
    last_name: lastName,
    display_name: index % 2 === 0 ? `${firstName} ${lastName}` : null,
    tagline: faker.person.jobTitle(),
    bio: faker.lorem.paragraph(),
    date_of_birth: '1990-01-01',
    gender: index % 2 === 0 ? 'male' : 'female',
    pronouns: index % 3 === 0 ? 'they/them' : null,
    nationality: 'NG',
    location: faker.location.city(),
    website: faker.internet.url(),
    avatar_id: null,
    cover_id: null,
    gravatar_url: null,
    hobbies: faker.helpers.arrayElements(hobbies, 3),
    interests: faker.helpers.arrayElements(interests, 2),
    availability: faker.helpers.arrayElement(availability),
    open_to: ['remote_work', 'consulting'],
    social_links: platforms
      .slice(0, 3)
      .map((p) => ({ platform: p, url: faker.internet.url() })),
    status: 'active',
    visibility: 'public',
    is_featured: index < 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),

    educations: [
      {
        id: makeId(),
        institution: faker.company.name(),
        degree: 'Bachelor of Science',
        field_of_study: 'Computer Science',
        grade: '3.8 GPA',
        description: null,
        start_year: startYear,
        end_year: hasCurrent ? null : startYear + 4,
        is_current: hasCurrent,
        position: 0,
      },
    ],

    experiences: [
      {
        id: makeId(),
        company: faker.company.name(),
        title: faker.person.jobTitle(),
        employment_type: faker.helpers.arrayElement(employmentTypes),
        location: faker.location.city(),
        description: faker.lorem.sentence(),
        company_url: faker.internet.url(),
        company_logo_id: null,
        start_date: `${startYear + 4}-06-01`,
        end_date: null,
        is_current: true,
        position: 0,
      },
    ],

    skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'].map((name, i) => ({
      id: makeId(),
      name,
      category: 'Engineering',
      proficiency: faker.helpers.arrayElement(proficiencies),
      position: i,
    })),

    projects: [
      {
        id: makeId(),
        title: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        url: faker.internet.url(),
        cover_id: null,
        tags: ['open-source', 'typescript'],
        start_date: `${startYear + 5}-01-01`,
        end_date: null,
        is_featured: true,
        position: 0,
      },
    ],

    certifications: [
      {
        id: makeId(),
        name: 'AWS Certified Solutions Architect',
        issuing_organization: 'Amazon Web Services',
        issue_date: '2022-03-01',
        expiry_date: '2025-03-01',
        does_not_expire: false,
        credential_id: 'AWS-123456',
        credential_url: faker.internet.url(),
        position: 0,
      },
    ],

    awards: [
      {
        id: makeId(),
        title: 'Best Developer Award',
        issuer: faker.company.name(),
        date: '2023-11-01',
        description: faker.lorem.sentence(),
        url: null,
        position: 0,
      },
    ],

    publications: [
      {
        id: makeId(),
        title: `${faker.commerce.productAdjective()} Approach to Modern APIs`,
        type: faker.helpers.arrayElement(publicationTypes),
        publisher: faker.company.name(),
        publication_date: '2023-05-01',
        url: faker.internet.url(),
        description: faker.lorem.sentence(),
        co_authors: [],
        position: 0,
      },
    ],

    languages: [
      { id: makeId(), language: 'English', proficiency: 'native', position: 0 },
      {
        id: makeId(),
        language: 'French',
        proficiency: faker.helpers.arrayElement(langProficiencies),
        position: 1,
      },
    ],

    volunteering: [
      {
        id: makeId(),
        organization: faker.company.name(),
        role: 'Mentor',
        cause: 'Education',
        description: faker.lorem.sentence(),
        start_date: '2021-01-01',
        end_date: null,
        is_current: true,
        position: 0,
      },
    ],
  };
}

export const mockPersonalProfiles: PersonalProfileModel[] = Array.from(
  { length: 20 },
  (_, i) => makeProfile(i),
);
