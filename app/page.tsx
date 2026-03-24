import Link from "next/link";

import { LiveClock } from "@/components/live-clock";
import { getPublicInstituteData } from "@/lib/data-store";

export const dynamic = "force-dynamic";

const roleAccentMap = {
  guest: "from-violet-50 to-white",
  student: "from-violet-50 to-white",
  educator: "from-violet-50 to-white",
  admin: "from-violet-50 to-white",
} as const;

export default async function Home() {
  const data = await getPublicInstituteData();

  return (
    <main className="relative overflow-hidden pb-16 pt-8">
      <div className="hero-orb left-[6%] top-24 h-64 w-64" />
      <div className="hero-orb right-[8%] top-[24rem] h-72 w-72 opacity-60" />

      <section className="section-shell grid gap-8 pt-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div className="space-y-7 text-center lg:text-left"> 
          <div className="surface-soft inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm text-[var(--color-muted)] lg:justify-start">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />
            Admissions | Preparation | Placement | Faculty Operations 
          </div>

          <div className="surface-soft inline-flex items-center justify-center gap-2 rounded-full ml-2 px-4 py-2 text-sm text-[var(--color-muted)] lg:justify-start">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />
            Trusted learning platform in Vashi
          </div> 

          <div className="space-y-5">
            <p className="keyword-line">
              Vashi | College Support | Government Exams | Placement Training
            </p>
            <h1 className="mx-auto max-w-5xl text-5xl font-semibold leading-[1.02] tracking-[-0.06em] text-[var(--color-heading)] sm:text-6xl xl:mx-0 xl:text-7xl">
              Smart Tutor helps students, educators, and academic teams work from one clean digital campus.
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-8 text-[var(--color-muted)] xl:mx-0">
              A professional learning platform for admissions storytelling,
              student dashboards, educator workflows, tests, notices, and admin
              access control with a cleaner community-first experience.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:items-start lg:justify-start">
            <Link href="/login" className="action-button justify-center px-6 py-4 text-base">
              Explore Demo Roles
            </Link>
            <Link
              href="/courses"
              className="surface-soft inline-flex items-center justify-center rounded-full px-6 py-4 text-base font-semibold text-[var(--color-heading)]"
            >
              Browse Courses
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {data.metrics.map((metric) => (
              <article key={metric.label} className="surface-soft rounded-3xl p-5 text-center lg:text-left">
                <p className="text-3xl font-semibold tracking-[-0.04em] text-[var(--color-heading)]">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{metric.label}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="surface graph-paper rounded-[2rem] p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="section-label">Media Ready Hero</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-heading)]">
                  Photo and video slots for institute stories
                </h2>
              </div>
              <LiveClock label="Campus Time" className="sm:min-w-[220px]" />
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="media-slot rounded-[1.75rem] p-6">
                <p className="keyword-line">Photo Slot</p>
                <div className="mt-4 flex h-44 items-center justify-center rounded-[1.5rem] border border-dashed border-[var(--color-border)] text-sm text-[var(--color-muted)]">
                  Future campus or classroom image
                </div>
              </div>
              <div className="media-slot rounded-[1.75rem] p-6">
                <p className="keyword-line">Video Slot</p>
                <div className="mt-4 flex h-44 items-center justify-center rounded-[1.5rem] border border-dashed border-[var(--color-border)] text-sm text-[var(--color-muted)]">
                  Future testimonial or promo video
                </div>
              </div>
            </div>
          </div>

          <div className="surface rounded-[2rem] p-6">
            <p className="section-label">Headline Lines</p>
            <div className="mt-5 grid gap-3">
              {data.headlineLines.map((line) => (
                <div key={line} className="surface-soft rounded-2xl px-4 py-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-strong)]">
                    {line}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-14">
        <div className="mb-9 text-center lg:text-left">
          <p className="section-label">Program Portfolio</p>
          <h2 className="section-title">Designed for outcomes across every learner journey</h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[var(--color-muted)] lg:mx-0">
            Smart Tutor brings together academic support, competitive exam
            training, placement preparation, and operations planning in a single,
            detailed public experience.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {data.programs.map((program, index) => (
            <article
              key={program.title}
              className="surface animate-appear rounded-[2rem] p-7"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="keyword-line">{program.category}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-heading)]">
                    {program.title}
                  </h3>
                </div>
                <span className="pill">{program.duration}</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                {program.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {program.focus.map((tag) => (
                  <span
                    key={tag}
                    className="surface-soft rounded-full px-3 py-2 text-xs font-semibold text-[var(--color-heading)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-14">
        <div className="mb-9 text-center lg:text-left">
          <p className="section-label">Authorization Model</p>
          <h2 className="section-title">Four clear roles and a post-login experience for each</h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-4">
          {data.roles.map((role, index) => (
            <article
              key={role.role}
              className={`surface animate-appear rounded-[2rem] bg-gradient-to-br ${roleAccentMap[role.role]} p-6 text-center lg:text-left`}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <p className="keyword-line">{role.role}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-heading)]">
                {role.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                {role.summary}
              </p>
              <ul className="mt-5 space-y-3 text-sm text-[var(--color-heading)]">
                {role.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-14">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="surface rounded-[2rem] p-7 text-center lg:text-left">
            <p className="section-label">Campus Experience</p>
            <h2 className="section-title max-w-2xl">
              Professional content structure for admissions, trust, and academic credibility
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {data.mediaFeatures.map((item) => (
                <div key={item.title} className="surface-soft rounded-3xl p-5">
                  <p className="text-base font-semibold text-[var(--color-heading)]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="surface rounded-[2rem] p-7 text-center lg:text-left">
            <p className="section-label">Clean Desktop Spacing</p>
            <h2 className="section-title">
              White shells, soft gray spacing, and violet accents inspired by the new dashboard design
            </h2>
            <div className="mt-8 grid gap-4">
              {data.designPrinciples.map((principle) => (
                <div key={principle.title} className="surface-soft rounded-3xl p-5">
                  <p className="text-lg font-semibold text-[var(--color-heading)]">
                    {principle.title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
