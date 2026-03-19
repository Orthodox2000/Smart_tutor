import { LiveClock } from "@/components/live-clock";
import { getPublicInstituteData } from "@/lib/mock-data";

export default function ContactPage() {
  const data = getPublicInstituteData();

  return (
    <main className="section-shell pb-16 pt-8">
      <section className="surface rounded-[2rem] p-8 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="text-center lg:text-left">
            <p className="section-label">Contact Us</p>
            <h1 className="section-title">Reach SmartIQ Academy for counselling, batches, and admissions</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-muted)]">
              The contact page is structured for phone, email, social channels,
              counselling calls, and later form submissions or branch map embeds.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="surface-soft rounded-3xl p-5">
                <p className="keyword-line">Phone</p>
                <p className="mt-3 text-lg font-semibold text-[var(--color-heading)]">
                  {data.profile.phone}
                </p>
              </div>
              <div className="surface-soft rounded-3xl p-5">
                <p className="keyword-line">Email</p>
                <p className="mt-3 text-lg font-semibold text-[var(--color-heading)]">
                  {data.profile.email}
                </p>
              </div>
              <div className="surface-soft rounded-3xl p-5">
                <p className="keyword-line">Address</p>
                <p className="mt-3 text-lg font-semibold text-[var(--color-heading)]">
                  {data.profile.address}
                </p>
              </div>
              <div className="surface-soft rounded-3xl p-5">
                <p className="keyword-line">Hours</p>
                <p className="mt-3 text-lg font-semibold text-[var(--color-heading)]">
                  {data.profile.hours}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <LiveClock label="Admissions Desk" />
            <div className="surface-soft rounded-[2rem] p-6">
              <p className="section-label">Social Media</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {data.socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="surface-soft rounded-2xl px-4 py-3 text-sm font-semibold text-[var(--color-heading)] shine-hover"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
