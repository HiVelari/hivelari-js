import velariClient from '@/lib/velari';
import type {
  PersonalProfileCertification,
  PersonalProfileEducation,
  PersonalProfileExperience,
  PersonalProfileLanguage,
  PersonalProfileProject,
  PersonalProfileSkill,
} from '@hivelari/sdk';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ identifier: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { identifier } = await params;
  return { title: `${identifier} — Personal Profile · HiVelari SDK` };
}

export default async function PersonalProfileDetailPage({ params }: PageProps) {
  const { identifier } = await params;

  let profile:
    | Awaited<ReturnType<typeof velariClient.profile.personal.get>>['data']
    | null = null;
  let errorMessage: string | null = null;

  try {
    const response = await velariClient.profile.personal.get(identifier);
    profile = response.data;
  } catch (error: unknown) {
    errorMessage = error instanceof Error ? error.message : String(error);
  }

  if (errorMessage || !profile) {
    return (
      <div className="mx-auto max-w-[1040px] px-16 pt-16 pb-28 max-[768px]:max-w-full max-[768px]:px-6">
        <p className="text-[15px] font-semibold text-red">
          {errorMessage ?? 'Profile not found.'}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1040px] px-16 pt-16 pb-28 max-[768px]:max-w-full max-[768px]:px-6 max-[768px]:pt-10">
      <div className="mb-8 flex items-start gap-5">
        {profile.gravatarUrl ? (
          <img
            src={profile.gravatarUrl}
            alt={profile.fullName}
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/[0.06] text-[22px] font-bold text-ink-2">
            {profile.firstName[0]}
            {profile.lastName[0]}
          </div>
        )}
        <div>
          <h1 className="mb-1 text-[26px] font-extrabold tracking-[-0.04em] text-ink">
            {profile.fullName}
          </h1>
          {profile.tagline && (
            <p className="text-[14px] text-ink-2">{profile.tagline}</p>
          )}
          <div className="mt-2 flex flex-wrap gap-2 text-[12px] text-ink-3">
            {profile.location && <span>{profile.location}</span>}
            {profile.availability && (
              <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px]">
                {profile.availability}
              </span>
            )}
          </div>
        </div>
      </div>

      {profile.bio && (
        <p className="mb-8 text-[14px] leading-[1.75] text-ink-2">
          {profile.bio}
        </p>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {profile.experiences.length > 0 && (
          <section>
            <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.07em] text-ink-3">
              Experience
            </h2>
            <div className="flex flex-col gap-3">
              {profile.experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="rounded-lg border border-line bg-surface p-4"
                >
                  <p className="text-[14px] font-bold text-ink">{exp.title}</p>
                  <p className="text-[12.5px] text-ink-2">
                    {exp.company} · {exp.employmentType}
                  </p>
                  <p className="mt-0.5 text-[11.5px] text-ink-3">
                    {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {profile.educations.length > 0 && (
          <section>
            <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.07em] text-ink-3">
              Education
            </h2>
            <div className="flex flex-col gap-3">
              {profile.educations.map((edu) => (
                <div
                  key={edu.id}
                  className="rounded-lg border border-line bg-surface p-4"
                >
                  <p className="text-[14px] font-bold text-ink">{edu.degree}</p>
                  <p className="text-[12.5px] text-ink-2">{edu.institution}</p>
                  <p className="mt-0.5 text-[11.5px] text-ink-3">
                    {edu.startYear} – {edu.isCurrent ? 'Present' : edu.endYear}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {profile.skills.length > 0 && (
          <section>
            <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.07em] text-ink-3">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="rounded border border-line bg-surface px-2 py-1 text-[12px] text-ink-2"
                >
                  {skill.name}
                  {skill.proficiency ? ` · ${skill.proficiency}` : ''}
                </span>
              ))}
            </div>
          </section>
        )}

        {profile.languages.length > 0 && (
          <section>
            <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.07em] text-ink-3">
              Languages
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.languages.map((lang) => (
                <span
                  key={lang.id}
                  className="rounded border border-line bg-surface px-2 py-1 text-[12px] text-ink-2"
                >
                  {lang.language} · {lang.proficiency}
                </span>
              ))}
            </div>
          </section>
        )}

        {profile.certifications.length > 0 && (
          <section>
            <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.07em] text-ink-3">
              Certifications
            </h2>
            <div className="flex flex-col gap-3">
              {profile.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="rounded-lg border border-line bg-surface p-4"
                >
                  <p className="text-[14px] font-bold text-ink">{cert.name}</p>
                  <p className="text-[12.5px] text-ink-2">
                    {cert.issuingOrganization}
                  </p>
                  {cert.issueDate && (
                    <p className="mt-0.5 text-[11.5px] text-ink-3">
                      Issued {cert.issueDate}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {profile.projects.length > 0 && (
          <section>
            <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.07em] text-ink-3">
              Projects
            </h2>
            <div className="flex flex-col gap-3">
              {profile.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-lg border border-line bg-surface p-4"
                >
                  <p className="text-[14px] font-bold text-ink">{proj.title}</p>
                  {proj.description && (
                    <p className="mt-1 text-[12.5px] text-ink-2">
                      {proj.description}
                    </p>
                  )}
                  {proj.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-ink-3"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
