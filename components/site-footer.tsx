import Link from "next/link";

import { LiveClock } from "@/components/live-clock";
import { getPublicInstituteData } from "@/lib/mock-data";

export function SiteFooter() {
  const data = getPublicInstituteData();

  return (
    <footer className="section-shell pb-8 pt-6">
      <div className="surface graph-paper rounded-[2rem] p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr_0.9fr]">
          <div>
            <Link href="/" className="text-2xl font-semibold tracking-[-0.05em] text-[var(--color-heading)]">
              SmartIQ
            </Link>
            <p className="mt-4 max-w-md text-sm leading-7 text-[var(--color-muted)]">
              SmartIQ Academy is designed as a polished institute platform for
              admissions, student learning, educator workflows, and admin
              control from one consistent interface.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <LiveClock label="Vashi Campus Time" />
              <LiveClock label="Support Desk Clock" />
            </div>
          </div>

          <div>
            <p className="section-label">Contact</p>
            <div className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
              <p>{data.profile.address}</p>
              <p>{data.profile.phone}</p>
              <p>{data.profile.email}</p>
              <p>{data.profile.hours}</p>
            </div>
          </div>

          <div>
            <p className="section-label">Social And Access</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
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
    </footer>
  );
}
