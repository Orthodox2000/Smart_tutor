"use client";

import { useEffect, useState } from "react";

import type { DetailedCourse } from "@/lib/types";

type CourseCatalogProps = {
  courses: DetailedCourse[];
};

export function CourseCatalog({ courses }: CourseCatalogProps) {
  const [selectedCourse, setSelectedCourse] = useState<DetailedCourse | null>(null);

  useEffect(() => {
    if (!selectedCourse) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedCourse(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedCourse]);

  return (
    <>
      <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {courses.map((course) => (
          <button
            key={course.id}
            type="button"
            onClick={() => setSelectedCourse(course)}
            className="surface rounded-[1.8rem] p-6 text-left shine-hover"
          >
            <p className="keyword-line">{course.tagline}</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-heading)]">
              {course.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
              {course.description}
            </p>

            <div className="mt-5 grid gap-3">
              <div className="surface-soft rounded-3xl p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                  Duration
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--color-heading)]">
                  {course.duration}
                </p>
              </div>
              <div className="surface-soft rounded-3xl p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                  Mode
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--color-heading)]">
                  {course.mode}
                </p>
              </div>
            </div>

            <span className="mt-5 inline-flex text-sm font-semibold text-[var(--color-accent)]">
              View full details
            </span>
          </button>
        ))}
      </section>

      {selectedCourse ? (
        <div
          className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={selectedCourse.title}
          onClick={() => setSelectedCourse(null)}
        >
          <div
            className="surface max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] p-6 sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="keyword-line">{selectedCourse.tagline}</p>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--color-heading)]">
                  {selectedCourse.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                className="surface-soft flex h-11 w-11 items-center justify-center rounded-full text-xl font-semibold text-[var(--color-heading)]"
                aria-label="Close course details"
              >
                x
              </button>
            </div>

            <p className="mt-5 text-sm leading-7 text-[var(--color-muted)]">
              {selectedCourse.description}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="surface-soft rounded-3xl p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                  Duration
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--color-heading)]">
                  {selectedCourse.duration}
                </p>
              </div>
              <div className="surface-soft rounded-3xl p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                  Mode
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--color-heading)]">
                  {selectedCourse.mode}
                </p>
              </div>
              <div className="surface-soft rounded-3xl p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                  Audience
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--color-heading)]">
                  {selectedCourse.audience}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {selectedCourse.points.map((point) => (
                <div key={point} className="surface-soft rounded-3xl p-5">
                  <p className="text-sm leading-7 text-[var(--color-heading)]">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
