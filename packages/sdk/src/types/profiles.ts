/** Social link item shared across personal and business profiles. */
export interface SocialLinkPayload {
  platform: string;
  url: string;
}

// ─── Personal Profile Payloads ───────────────────────────────────────────────

export interface PersonalProfileEducationPayload {
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
}

export interface PersonalProfileExperiencePayload {
  id: string;
  company: string;
  title: string;
  employment_type: string | null;
  location: string | null;
  description: string | null;
  company_url: string | null;
  company_logo_id: string | null;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  position: number;
}

export interface PersonalProfileSkillPayload {
  id: string;
  name: string;
  category: string | null;
  proficiency: string | null;
  position: number;
}

export interface PersonalProfileProjectPayload {
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
}

export interface PersonalProfileCertificationPayload {
  id: string;
  name: string;
  issuing_organization: string;
  issue_date: string | null;
  expiry_date: string | null;
  does_not_expire: boolean;
  credential_id: string | null;
  credential_url: string | null;
  position: number;
}

export interface PersonalProfileAwardPayload {
  id: string;
  title: string;
  issuer: string;
  date: string | null;
  description: string | null;
  url: string | null;
  position: number;
}

export interface PersonalProfilePublicationPayload {
  id: string;
  title: string;
  type: string;
  publisher: string | null;
  publication_date: string | null;
  url: string | null;
  description: string | null;
  co_authors: string[];
  position: number;
}

export interface PersonalProfileLanguagePayload {
  id: string;
  language: string;
  proficiency: string;
  position: number;
}

export interface PersonalProfileVolunteeringPayload {
  id: string;
  organization: string;
  role: string;
  cause: string | null;
  description: string | null;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  position: number;
}

export interface PersonalProfilePayload {
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
  location: string | null;
  website: string | null;
  avatar_id: string | null;
  cover_id: string | null;
  gravatar_url: string | null;
  hobbies: string[];
  interests: string[];
  availability: string | null;
  open_to: string[];
  social_links: SocialLinkPayload[];
  status: string;
  visibility: string;
  is_featured: boolean;
  created_at: string | null;
  updated_at: string | null;
  educations?: PersonalProfileEducationPayload[];
  experiences?: PersonalProfileExperiencePayload[];
  skills?: PersonalProfileSkillPayload[];
  projects?: PersonalProfileProjectPayload[];
  certifications?: PersonalProfileCertificationPayload[];
  awards?: PersonalProfileAwardPayload[];
  publications?: PersonalProfilePublicationPayload[];
  languages?: PersonalProfileLanguagePayload[];
  volunteering?: PersonalProfileVolunteeringPayload[];
}

// ─── Business Profile Payloads ────────────────────────────────────────────────

export interface BusinessProfileServicePayload {
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
}

export interface BusinessProfileTeamMemberPayload {
  id: string;
  personal_profile_id: string | null;
  name: string | null;
  role: string;
  bio: string | null;
  avatar_id: string | null;
  is_featured: boolean;
  position: number;
}

export interface BusinessProfileGalleryPayload {
  id: string;
  media_id: string;
  caption: string | null;
  alt: string | null;
  position: number;
}

export interface BusinessProfileAwardPayload {
  id: string;
  title: string;
  issuer: string;
  date: string | null;
  description: string | null;
  url: string | null;
  badge_id: string | null;
  position: number;
}

export interface BusinessProfileClientPayload {
  id: string;
  name: string;
  type: string;
  logo_id: string | null;
  url: string | null;
  description: string | null;
  position: number;
}

export interface BusinessProfileMilestonePayload {
  id: string;
  title: string;
  description: string | null;
  date: string;
  icon: string | null;
  position: number;
}

export interface BusinessProfileHourPayload {
  id: string;
  day: string;
  open_time: string | null;
  close_time: string | null;
  is_closed: boolean;
  note: string | null;
}

export interface BusinessProfileFaqPayload {
  id: string;
  question: string;
  answer: string;
  position: number;
}

export interface BusinessProfileCaseStudyPayload {
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
}

export interface BusinessProfilePayload {
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
  social_links: SocialLinkPayload[];
  status: string;
  visibility: string;
  is_featured: boolean;
  created_at: string | null;
  updated_at: string | null;
  services?: BusinessProfileServicePayload[];
  team_members?: BusinessProfileTeamMemberPayload[];
  gallery?: BusinessProfileGalleryPayload[];
  awards?: BusinessProfileAwardPayload[];
  clients?: BusinessProfileClientPayload[];
  milestones?: BusinessProfileMilestonePayload[];
  hours?: BusinessProfileHourPayload[];
  faqs?: BusinessProfileFaqPayload[];
  case_studies?: BusinessProfileCaseStudyPayload[];
}
