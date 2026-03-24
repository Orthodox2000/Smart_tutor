import Link from "next/link";

import { CourseCatalog } from "@/components/course-catalog";
import { getPublicInstituteData } from "@/lib/data-store";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const data = await getPublicInstituteData();

  return (
    <main className="section-shell pb-16 pt-8">
      <section className="surface rounded-[2rem] p-8 sm:p-10">
        <div className="max-w-4xl text-center lg:text-left">
          <p className="section-label">Courses Offered</p>
          <h1 className="section-title">
            Smart Tutor pathways arranged as a clean course grid for faster admissions browsing
          </h1>
          <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
            Compare placement, government exam, academic support, and higher-secondary programs at a glance.
            Open any course card to view the full details without making the page feel heavy.
          </p>
        </div>
      </section>

      <CourseCatalog courses={data.detailedCourses} />

      <section className="mt-8 text-center lg:text-left">
        <Link href="/contact" className="action-button px-6 py-4">
          Enquire For Admissions
        </Link>
      </section>
    </main>
  );
}
