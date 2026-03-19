import Link from "next/link";

import { getPublicInstituteData } from "@/lib/mock-data";

export default function CoursesPage() {
  const data = getPublicInstituteData();

  return (
    <main className="section-shell pb-16 pt-8">
      <section className="surface rounded-[2rem] p-8 sm:p-10">
        <div className="max-w-4xl text-center lg:text-left">
          <p className="section-label">Courses Offered</p>
          <h1 className="section-title">
            Detailed, clean course presentation for admissions and institute trust
          </h1>
          <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
            This page is designed to hold rich descriptions, batch details,
            outcomes, mentoring highlights, and media later without becoming cluttered.
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-6">
        {data.detailedCourses.map((course) => (
          <article key={course.title} className="surface rounded-[2rem] p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <p className="keyword-line">{course.tagline}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[var(--color-heading)]">
                  {course.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                  {course.description}
                </p>
              </div>
              <div className="surface-soft rounded-3xl p-5 lg:min-w-[260px]">
                <p className="text-sm font-semibold text-[var(--color-heading)]">
                  Duration: {course.duration}
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--color-heading)]">
                  Mode: {course.mode}
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--color-heading)]">
                  Audience: {course.audience}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {course.points.map((point) => (
                <div key={point} className="surface-soft rounded-3xl p-5">
                  <p className="text-sm leading-7 text-[var(--color-heading)]">{point}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="mt-8 text-center lg:text-left">
        <Link href="/contact" className="action-button px-6 py-4">
          Enquire For Admissions
        </Link>
      </section>
    </main>
  );
}
