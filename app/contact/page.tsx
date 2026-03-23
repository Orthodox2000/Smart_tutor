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
              Reach SmartIQ through calls, WhatsApp, email, campus visits, and social channels.
              This structure is ready for richer CRM or admissions workflows later.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
              {data.contactActions.map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  target={action.href.startsWith("http") ? "_blank" : undefined}
                  rel={action.href.startsWith("http") ? "noreferrer" : undefined}
                  className={
                    action.style === "primary"
                      ? "action-button px-5 py-3"
                      : "surface rounded-full px-5 py-3 text-sm font-semibold text-[var(--color-heading)]"
                  }
                >
                  {action.label}
                </a>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {data.contactMethods.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="surface-soft rounded-3xl p-5 shine-hover"
                >
                  <p className="keyword-line">{item.label}</p>
                  <p className="mt-3 text-lg font-semibold text-[var(--color-heading)]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                    {item.description}
                  </p>
                </a>
              ))}
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
                    className="social-tile surface-soft rounded-2xl px-4 py-3 text-sm font-semibold text-[var(--color-heading)] shine-hover"
                    style={{
                      ["--social-color" as string]: item.color,
                      ["--social-glow" as string]: item.glow,
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="surface-soft rounded-[2rem] p-6">
              <p className="section-label">Primary Institute Details</p>
              <div className="mt-5 grid gap-4">
                <div className="surface rounded-3xl p-5">
                  <p className="text-sm font-semibold text-[var(--color-heading)]">
                    {data.profile.address}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                    {data.profile.hours}
                  </p>
                </div>
                <div className="surface rounded-3xl p-5">
                  <p className="text-sm font-semibold text-[var(--color-heading)]">
                    {data.profile.email}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                    Main institute mailbox for campus communication and admissions follow-up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
