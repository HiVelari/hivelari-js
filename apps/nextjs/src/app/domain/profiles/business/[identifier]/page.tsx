import velariClient from '@/lib/velari';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ identifier: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { identifier } = await params;
  return { title: `${identifier} — Business Profile · HiVelari SDK` };
}

export default async function BusinessProfileDetailPage({ params }: PageProps) {
  const { identifier } = await params;

  let profile:
    | Awaited<ReturnType<typeof velariClient.profile.business.get>>['data']
    | null = null;
  let errorMessage: string | null = null;

  try {
    const response = await velariClient.profile.business.get(identifier);
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
            alt={profile.name}
            className="h-16 w-16 rounded-xl object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/[0.06] text-[22px] font-bold text-ink-2">
            {profile.name[0]}
          </div>
        )}
        <div>
          <h1 className="mb-1 text-[26px] font-extrabold tracking-[-0.04em] text-ink">
            {profile.name}
          </h1>
          {profile.tagline && (
            <p className="text-[14px] text-ink-2">{profile.tagline}</p>
          )}
          <div className="mt-2 flex flex-wrap gap-2 text-[12px] text-ink-3">
            {profile.industry && <span>{profile.industry}</span>}
            {profile.city && profile.country && (
              <span>
                {profile.city}, {profile.country}
              </span>
            )}
            {profile.foundedYear && (
              <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px]">
                Est. {profile.foundedYear}
              </span>
            )}
          </div>
        </div>
      </div>

      {profile.description && (
        <p className="mb-8 text-[14px] leading-[1.75] text-ink-2">
          {profile.description}
        </p>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {profile.services.length > 0 && (
          <section>
            <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.07em] text-ink-3">
              Services
            </h2>
            <div className="flex flex-col gap-3">
              {profile.services.map((service) => (
                <div
                  key={service.id}
                  className="rounded-lg border border-line bg-surface p-4"
                >
                  <p className="text-[14px] font-bold text-ink">
                    {service.name}
                  </p>
                  {service.description && (
                    <p className="mt-1 text-[12.5px] text-ink-2">
                      {service.description}
                    </p>
                  )}
                  {service.priceFrom != null && (
                    <p className="mt-1.5 font-mono text-[11.5px] text-ink-3">
                      {service.currency} {(service.priceFrom / 100).toFixed(2)}
                      {service.priceTo != null
                        ? ` – ${(service.priceTo / 100).toFixed(2)}`
                        : ''}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {profile.teamMembers.length > 0 && (
          <section>
            <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.07em] text-ink-3">
              Team
            </h2>
            <div className="flex flex-col gap-3">
              {profile.teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="rounded-lg border border-line bg-surface p-4"
                >
                  <p className="text-[14px] font-bold text-ink">
                    {member.name}
                  </p>
                  <p className="text-[12.5px] text-ink-2">{member.role}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {profile.clients.length > 0 && (
          <section>
            <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.07em] text-ink-3">
              Clients & Partners
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.clients.map((client) => (
                <span
                  key={client.id}
                  className="rounded border border-line bg-surface px-2.5 py-1 text-[12px] text-ink-2"
                >
                  {client.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {profile.milestones.length > 0 && (
          <section>
            <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.07em] text-ink-3">
              Milestones
            </h2>
            <div className="flex flex-col gap-3">
              {profile.milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className="rounded-lg border border-line bg-surface p-4"
                >
                  <p className="text-[14px] font-bold text-ink">
                    {milestone.title}
                  </p>
                  <p className="mt-0.5 font-mono text-[11.5px] text-ink-3">
                    {milestone.date}
                  </p>
                  {milestone.description && (
                    <p className="mt-1 text-[12.5px] text-ink-2">
                      {milestone.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {profile.faqs.length > 0 && (
          <section className="lg:col-span-2">
            <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.07em] text-ink-3">
              FAQs
            </h2>
            <div className="flex flex-col gap-3">
              {profile.faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="rounded-lg border border-line bg-surface p-4"
                >
                  <p className="text-[14px] font-bold text-ink">
                    {faq.question}
                  </p>
                  <p className="mt-1 text-[13px] leading-[1.65] text-ink-2">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {profile.caseStudies.length > 0 && (
          <section className="lg:col-span-2">
            <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.07em] text-ink-3">
              Case Studies
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {profile.caseStudies.map((cs) => (
                <div
                  key={cs.id}
                  className="rounded-lg border border-line bg-surface p-4"
                >
                  <p className="text-[14px] font-bold text-ink">{cs.title}</p>
                  {cs.clientName && (
                    <p className="text-[12px] text-ink-3">{cs.clientName}</p>
                  )}
                  {cs.summary && (
                    <p className="mt-1.5 text-[12.5px] leading-[1.6] text-ink-2">
                      {cs.summary}
                    </p>
                  )}
                  {cs.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {cs.tags.map((tag) => (
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
