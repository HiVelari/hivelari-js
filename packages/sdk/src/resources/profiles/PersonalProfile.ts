import type {
  PersonalProfileAwardPayload,
  PersonalProfileCertificationPayload,
  PersonalProfileEducationPayload,
  PersonalProfileExperiencePayload,
  PersonalProfileLanguagePayload,
  PersonalProfilePayload,
  PersonalProfileProjectPayload,
  PersonalProfilePublicationPayload,
  PersonalProfileSkillPayload,
  PersonalProfileVolunteeringPayload,
  SocialLinkPayload,
} from '@/types/profiles';

export interface PersonalProfileEducation {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string | null;
  grade: string | null;
  description: string | null;
  startYear: number;
  endYear: number | null;
  isCurrent: boolean;
  position: number;
}

export interface PersonalProfileExperience {
  id: string;
  company: string;
  title: string;
  employmentType: string | null;
  location: string | null;
  description: string | null;
  companyUrl: string | null;
  companyLogoId: string | null;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  position: number;
}

export interface PersonalProfileSkill {
  id: string;
  name: string;
  category: string | null;
  proficiency: string | null;
  position: number;
}

export interface PersonalProfileProject {
  id: string;
  title: string;
  description: string | null;
  url: string | null;
  coverId: string | null;
  tags: string[];
  startDate: string | null;
  endDate: string | null;
  isFeatured: boolean;
  position: number;
}

export interface PersonalProfileCertification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string | null;
  expiryDate: string | null;
  doesNotExpire: boolean;
  credentialId: string | null;
  credentialUrl: string | null;
  position: number;
}

export interface PersonalProfileAward {
  id: string;
  title: string;
  issuer: string;
  date: string | null;
  description: string | null;
  url: string | null;
  position: number;
}

export interface PersonalProfilePublication {
  id: string;
  title: string;
  type: string;
  publisher: string | null;
  publicationDate: string | null;
  url: string | null;
  description: string | null;
  coAuthors: string[];
  position: number;
}

export interface PersonalProfileLanguage {
  id: string;
  language: string;
  proficiency: string;
  position: number;
}

export interface PersonalProfileVolunteering {
  id: string;
  organization: string;
  role: string;
  cause: string | null;
  description: string | null;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  position: number;
}

export class PersonalProfile {
  readonly id: string;
  readonly slug: string;
  readonly email: string | null;
  readonly phone: string | null;
  readonly firstName: string;
  readonly lastName: string;
  readonly displayName: string | null;
  readonly tagline: string | null;
  readonly bio: string | null;
  readonly dateOfBirth: string | null;
  readonly gender: string | null;
  readonly pronouns: string | null;
  readonly nationality: string | null;
  readonly location: string | null;
  readonly website: string | null;
  readonly avatarId: string | null;
  readonly coverId: string | null;
  readonly gravatarUrl: string | null;
  readonly hobbies: string[];
  readonly interests: string[];
  readonly availability: string | null;
  readonly openTo: string[];
  readonly socialLinks: SocialLinkPayload[];
  readonly status: string;
  readonly visibility: string;
  readonly isFeatured: boolean;
  readonly createdAt: string | null;
  readonly updatedAt: string | null;
  readonly educations: PersonalProfileEducation[];
  readonly experiences: PersonalProfileExperience[];
  readonly skills: PersonalProfileSkill[];
  readonly projects: PersonalProfileProject[];
  readonly certifications: PersonalProfileCertification[];
  readonly awards: PersonalProfileAward[];
  readonly publications: PersonalProfilePublication[];
  readonly languages: PersonalProfileLanguage[];
  readonly volunteering: PersonalProfileVolunteering[];

  constructor(payload: PersonalProfilePayload) {
    this.id = payload.id;
    this.slug = payload.slug;
    this.email = payload.email ?? null;
    this.phone = payload.phone ?? null;
    this.firstName = payload.first_name;
    this.lastName = payload.last_name;
    this.displayName = payload.display_name ?? null;
    this.tagline = payload.tagline ?? null;
    this.bio = payload.bio ?? null;
    this.dateOfBirth = payload.date_of_birth ?? null;
    this.gender = payload.gender ?? null;
    this.pronouns = payload.pronouns ?? null;
    this.nationality = payload.nationality ?? null;
    this.location = payload.location ?? null;
    this.website = payload.website ?? null;
    this.avatarId = payload.avatar_id ?? null;
    this.coverId = payload.cover_id ?? null;
    this.gravatarUrl = payload.gravatar_url ?? null;
    this.hobbies = payload.hobbies ?? [];
    this.interests = payload.interests ?? [];
    this.availability = payload.availability ?? null;
    this.openTo = payload.open_to ?? [];
    this.socialLinks = payload.social_links ?? [];
    this.status = payload.status;
    this.visibility = payload.visibility;
    this.isFeatured = payload.is_featured;
    this.createdAt = payload.created_at ?? null;
    this.updatedAt = payload.updated_at ?? null;

    this.educations = (payload.educations ?? []).map(
      (e: PersonalProfileEducationPayload) => ({
        id: e.id,
        institution: e.institution,
        degree: e.degree,
        fieldOfStudy: e.field_of_study,
        grade: e.grade,
        description: e.description,
        startYear: e.start_year,
        endYear: e.end_year,
        isCurrent: e.is_current,
        position: e.position,
      }),
    );

    this.experiences = (payload.experiences ?? []).map(
      (e: PersonalProfileExperiencePayload) => ({
        id: e.id,
        company: e.company,
        title: e.title,
        employmentType: e.employment_type,
        location: e.location,
        description: e.description,
        companyUrl: e.company_url,
        companyLogoId: e.company_logo_id,
        startDate: e.start_date,
        endDate: e.end_date,
        isCurrent: e.is_current,
        position: e.position,
      }),
    );

    this.skills = (payload.skills ?? []).map(
      (s: PersonalProfileSkillPayload) => ({
        id: s.id,
        name: s.name,
        category: s.category,
        proficiency: s.proficiency,
        position: s.position,
      }),
    );

    this.projects = (payload.projects ?? []).map(
      (p: PersonalProfileProjectPayload) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        url: p.url,
        coverId: p.cover_id,
        tags: p.tags ?? [],
        startDate: p.start_date,
        endDate: p.end_date,
        isFeatured: p.is_featured,
        position: p.position,
      }),
    );

    this.certifications = (payload.certifications ?? []).map(
      (c: PersonalProfileCertificationPayload) => ({
        id: c.id,
        name: c.name,
        issuingOrganization: c.issuing_organization,
        issueDate: c.issue_date,
        expiryDate: c.expiry_date,
        doesNotExpire: c.does_not_expire,
        credentialId: c.credential_id,
        credentialUrl: c.credential_url,
        position: c.position,
      }),
    );

    this.awards = (payload.awards ?? []).map(
      (a: PersonalProfileAwardPayload) => ({
        id: a.id,
        title: a.title,
        issuer: a.issuer,
        date: a.date,
        description: a.description,
        url: a.url,
        position: a.position,
      }),
    );

    this.publications = (payload.publications ?? []).map(
      (p: PersonalProfilePublicationPayload) => ({
        id: p.id,
        title: p.title,
        type: p.type,
        publisher: p.publisher,
        publicationDate: p.publication_date,
        url: p.url,
        description: p.description,
        coAuthors: p.co_authors ?? [],
        position: p.position,
      }),
    );

    this.languages = (payload.languages ?? []).map(
      (l: PersonalProfileLanguagePayload) => ({
        id: l.id,
        language: l.language,
        proficiency: l.proficiency,
        position: l.position,
      }),
    );

    this.volunteering = (payload.volunteering ?? []).map(
      (v: PersonalProfileVolunteeringPayload) => ({
        id: v.id,
        organization: v.organization,
        role: v.role,
        cause: v.cause,
        description: v.description,
        startDate: v.start_date,
        endDate: v.end_date,
        isCurrent: v.is_current,
        position: v.position,
      }),
    );
  }

  /** Full name derived from first + last, or display_name if set. */
  get fullName(): string {
    return this.displayName ?? `${this.firstName} ${this.lastName}`;
  }
}
