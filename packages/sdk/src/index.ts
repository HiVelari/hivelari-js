import 'server-only';

export { Velari } from '@/core/client';
export { VelariError } from '@/errors';
export { CommerceService } from '@/services/commerce';
export { RecordsService } from '@/services/records';
export { AuthService } from '@/services/auth';
export {
  ProfileService,
  PersonalProfileService,
  BusinessProfileService,
} from '@/services/profiles';

// Resources
export { VelariResponse } from '@/resources/VelariResponse';
export { PaginatedResponse } from '@/resources/PaginatedResponse';
export { PingInfo } from '@/resources/PingInfo';
export { Product } from '@/resources/commerce/Product';
export type {
  ProductFile,
  ProductImage,
  ProductSpecification,
  ProductSeo,
  ProductOption,
  ProductOptionValue,
  ProductVariant,
  ProductVariantOptionValue,
} from '@/resources/commerce/Product';
export { Category } from '@/resources/records/Category';
export { Currency } from '@/resources/records/Currency';
export { PersonalProfile } from '@/resources/profiles/PersonalProfile';
export type {
  PersonalProfileEducation,
  PersonalProfileExperience,
  PersonalProfileSkill,
  PersonalProfileProject,
  PersonalProfileCertification,
  PersonalProfileAward,
  PersonalProfilePublication,
  PersonalProfileLanguage,
  PersonalProfileVolunteering,
} from '@/resources/profiles/PersonalProfile';
export { BusinessProfile } from '@/resources/profiles/BusinessProfile';
export type {
  BusinessProfileService as BusinessProfileServiceItem,
  BusinessProfileTeamMember,
  BusinessProfileGallery,
  BusinessProfileAward,
  BusinessProfileClient,
  BusinessProfileMilestone,
  BusinessProfileHour,
  BusinessProfileFaq,
  BusinessProfileCaseStudy,
} from '@/resources/profiles/BusinessProfile';

// Requests
export type { ListProductsParams } from '@/requests/commerce/ListProduct';
export type { ListPersonalProfilesParams } from '@/requests/profiles/ListPersonalProfiles';
export type { ListBusinessProfilesParams } from '@/requests/profiles/ListBusinessProfiles';

// Types
export type {
  CommerceProductPayload,
  ProductFilePayload,
  ProductImagePayload,
  ProductSpecificationPayload,
  ProductSeoPayload,
  ProductOptionPayload,
  ProductOptionValuePayload,
  ProductVariantPayload,
  ProductVariantOptionValuePayload,
} from '@/types/commerce';
export type {
  LoginParams,
  RegisterParams,
  SocialExchangeTokenParams,
  UpdateProfileParams,
  AuthUserPayload,
  AuthResponsePayload,
} from '@/types/auth';
export type { PaginatedPayload } from '@/types/core';
export type { CategoryPayload, CurrencyPayload } from '@/types/records';
export type {
  SocialLinkPayload,
  PersonalProfilePayload,
  PersonalProfileEducationPayload,
  PersonalProfileExperiencePayload,
  PersonalProfileSkillPayload,
  PersonalProfileProjectPayload,
  PersonalProfileCertificationPayload,
  PersonalProfileAwardPayload,
  PersonalProfilePublicationPayload,
  PersonalProfileLanguagePayload,
  PersonalProfileVolunteeringPayload,
  BusinessProfilePayload,
  BusinessProfileServicePayload,
  BusinessProfileTeamMemberPayload,
  BusinessProfileGalleryPayload,
  BusinessProfileAwardPayload as BusinessProfileAwardPayloadType,
  BusinessProfileClientPayload,
  BusinessProfileMilestonePayload,
  BusinessProfileHourPayload,
  BusinessProfileFaqPayload,
  BusinessProfileCaseStudyPayload,
} from '@/types/profiles';
