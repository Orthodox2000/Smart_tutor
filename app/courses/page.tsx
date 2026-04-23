import Link from "next/link";

import { CourseCatalogClient } from "@/components/course-catalog-client";
import { getAllDetailedCourses } from "@/lib/data-store";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const courses = await getAllDetailedCourses();

  return (
    <main className="section-shell pb-16 pt-8">
      <section className="surface rounded-[2rem] p-8 sm:p-10">
        <div className="max-w-4xl text-center lg:text-left">
          <p className="section-label">Courses Offered</p>
          <h1 className="section-title">
            Smart Tutor courses at a glance
          </h1>
          <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
            Compare programs quickly. Open any card for details.
          </p>
        </div>
      </section>

      <CourseCatalogClient initialCourses={courses} />

      <section className="mt-8 text-center lg:text-left">
        <Link href="/contact" className="action-button px-6 py-4">
          Ask About Admissions
        </Link>
      </section>
    </main>
  );
}
