import type {
  BusinessProfileAwardPayload,
  BusinessProfileCaseStudyPayload,
  BusinessProfileClientPayload,
  BusinessProfileFaqPayload,
  BusinessProfileGalleryPayload,
  BusinessProfileHourPayload,
  BusinessProfileMilestonePayload,
  BusinessProfilePayload,
  BusinessProfileServicePayload,
  BusinessProfileTeamMemberPayload,
  SocialLinkPayload,
} from '@/types/profiles';

export interface BusinessProfileService {
  id: string;
  name: string;
  description: string | null;
  priceFrom: number | null;
  priceTo: number | null;
  currency: string | null;
  duration: string | null;
  coverId: string | null;
  isFeatured: boolean;
  position: number;
}

export interface BusinessProfileTeamMember {
  id: string;
  personalProfileId: string | null;
  name: string | null;
  role: string;
  bio: string | null;
  avatarId: string | null;
  isFeatured: boolean;
  position: number;
}

export interface BusinessProfileGallery {
  id: string;
  mediaId: string;
  caption: string | null;
  alt: string | null;
  position: number;
}

export interface BusinessProfileAward {
  id: string;
  title: string;
  issuer: string;
  date: string | null;
  description: string | null;
  url: string | null;
  badgeId: string | null;
  position: number;
}

export interface BusinessProfileClient {
  id: string;
  name: string;
  type: string;
  logoId: string | null;
  url: string | null;
  description: string | null;
  position: number;
}

export interface BusinessProfileMilestone {
  id: string;
  title: string;
  description: string | null;
  date: string;
  icon: string | null;
  position: number;
}

export interface BusinessProfileHour {
  id: string;
  day: string;
  openTime: string | null;
  closeTime: string | null;
  isClosed: boolean;
  note: string | null;
}

export interface BusinessProfileFaq {
  id: string;
  question: string;
  answer: string;
  position: number;
}

export interface BusinessProfileCaseStudy {
  id: string;
  title: string;
  clientName: string | null;
  summary: string | null;
  outcome: string | null;
  url: string | null;
  coverId: string | null;
  tags: string[];
  isFeatured: boolean;
  position: number;
}

export class BusinessProfile {
  readonly id: string;
  readonly slug: string;
  readonly email: string | null;
  readonly phone: string | null;
  readonly name: string;
  readonly tagline: string | null;
  readonly description: string | null;
  readonly industry: string | null;
  readonly businessType: string | null;
  readonly foundedYear: number | null;
  readonly employeeRange: string | null;
  readonly registrationNumber: string | null;
  readonly taxId: string | null;
  readonly website: string | null;
  readonly supportEmail: string | null;
  readonly supportPhone: string | null;
  readonly logoId: string | null;
  readonly coverId: string | null;
  readonly gravatarUrl: string | null;
  readonly addressLine1: string | null;
  readonly addressLine2: string | null;
  readonly city: string | null;
  readonly state: string | null;
  readonly country: string | null;
  readonly postalCode: string | null;
  readonly socialLinks: SocialLinkPayload[];
  readonly status: string;
  readonly visibility: string;
  readonly isFeatured: boolean;
  readonly createdAt: string | null;
  readonly updatedAt: string | null;
  readonly services: BusinessProfileService[];
  readonly teamMembers: BusinessProfileTeamMember[];
  readonly gallery: BusinessProfileGallery[];
  readonly awards: BusinessProfileAward[];
  readonly clients: BusinessProfileClient[];
  readonly milestones: BusinessProfileMilestone[];
  readonly hours: BusinessProfileHour[];
  readonly faqs: BusinessProfileFaq[];
  readonly caseStudies: BusinessProfileCaseStudy[];

  constructor(payload: BusinessProfilePayload) {
    this.id = payload.id;
    this.slug = payload.slug;
    this.email = payload.email ?? null;
    this.phone = payload.phone ?? null;
    this.name = payload.name;
    this.tagline = payload.tagline ?? null;
    this.description = payload.description ?? null;
    this.industry = payload.industry ?? null;
    this.businessType = payload.business_type ?? null;
    this.foundedYear = payload.founded_year ?? null;
    this.employeeRange = payload.employee_range ?? null;
    this.registrationNumber = payload.registration_number ?? null;
    this.taxId = payload.tax_id ?? null;
    this.website = payload.website ?? null;
    this.supportEmail = payload.support_email ?? null;
    this.supportPhone = payload.support_phone ?? null;
    this.logoId = payload.logo_id ?? null;
    this.coverId = payload.cover_id ?? null;
    this.gravatarUrl = payload.gravatar_url ?? null;
    this.addressLine1 = payload.address_line_1 ?? null;
    this.addressLine2 = payload.address_line_2 ?? null;
    this.city = payload.city ?? null;
    this.state = payload.state ?? null;
    this.country = payload.country ?? null;
    this.postalCode = payload.postal_code ?? null;
    this.socialLinks = payload.social_links ?? [];
    this.status = payload.status;
    this.visibility = payload.visibility;
    this.isFeatured = payload.is_featured;
    this.createdAt = payload.created_at ?? null;
    this.updatedAt = payload.updated_at ?? null;

    this.services = (payload.services ?? []).map(
      (s: BusinessProfileServicePayload) => ({
        id: s.id,
        name: s.name,
        description: s.description,
        priceFrom: s.price_from,
        priceTo: s.price_to,
        currency: s.currency,
        duration: s.duration,
        coverId: s.cover_id,
        isFeatured: s.is_featured,
        position: s.position,
      }),
    );

    this.teamMembers = (payload.team_members ?? []).map(
      (m: BusinessProfileTeamMemberPayload) => ({
        id: m.id,
        personalProfileId: m.personal_profile_id,
        name: m.name,
        role: m.role,
        bio: m.bio,
        avatarId: m.avatar_id,
        isFeatured: m.is_featured,
        position: m.position,
      }),
    );

    this.gallery = (payload.gallery ?? []).map(
      (g: BusinessProfileGalleryPayload) => ({
        id: g.id,
        mediaId: g.media_id,
        caption: g.caption,
        alt: g.alt,
        position: g.position,
      }),
    );

    this.awards = (payload.awards ?? []).map(
      (a: BusinessProfileAwardPayload) => ({
        id: a.id,
        title: a.title,
        issuer: a.issuer,
        date: a.date,
        description: a.description,
        url: a.url,
        badgeId: a.badge_id,
        position: a.position,
      }),
    );

    this.clients = (payload.clients ?? []).map(
      (c: BusinessProfileClientPayload) => ({
        id: c.id,
        name: c.name,
        type: c.type,
        logoId: c.logo_id,
        url: c.url,
        description: c.description,
        position: c.position,
      }),
    );

    this.milestones = (payload.milestones ?? []).map(
      (m: BusinessProfileMilestonePayload) => ({
        id: m.id,
        title: m.title,
        description: m.description,
        date: m.date,
        icon: m.icon,
        position: m.position,
      }),
    );

    this.hours = (payload.hours ?? []).map((h: BusinessProfileHourPayload) => ({
      id: h.id,
      day: h.day,
      openTime: h.open_time,
      closeTime: h.close_time,
      isClosed: h.is_closed,
      note: h.note,
    }));

    this.faqs = (payload.faqs ?? []).map((f: BusinessProfileFaqPayload) => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
      position: f.position,
    }));

    this.caseStudies = (payload.case_studies ?? []).map(
      (c: BusinessProfileCaseStudyPayload) => ({
        id: c.id,
        title: c.title,
        clientName: c.client_name,
        summary: c.summary,
        outcome: c.outcome,
        url: c.url,
        coverId: c.cover_id,
        tags: c.tags ?? [],
        isFeatured: c.is_featured,
        position: c.position,
      }),
    );
  }
}
