# Smart Tutor Team Guide

## What exists now

- Public landing page with polished institute storytelling and animated sections.
- MongoDB-backed authentication and app content, with the old mock dataset now serving only as a bootstrap template source.
- Mobile header keeps login as a visible quick-access action outside the hamburger menu, opening a compact login sheet on small screens.
- Role-aware dashboard shell for guest, student, educator, and admin.
- Local API routes for auth, dashboard, courses, messages, tests, users, institute data, and bootstrap initialization.
- MongoDB now acts as the runtime source of truth through `MONGODB_URI` and `MONGODB_DB`.

## Demo credentials

- Guest: `guest@smarttutor.demo` / `Guest@123`
- Student: `riya@smarttutor.demo` / `Student@123`
- Educator: `amit@smarttutor.demo` / `Educator@123`
- Admin: `admin@smarttutor.demo` / `Admin@123`

## Core files

- `app/page.tsx`: landing page
- `app/login/page.tsx`: mock login
- `app/dashboard/page.tsx`: role-aware dashboard
- `app/mock-test/page.tsx`: interactive mock-test experience
- `app/api/**/route.ts`: local APIs
- `app/api/admin/bootstrap/route.ts`: protected bootstrap route for initializing Mongo collections from the template dataset
- `components/theme-provider.tsx`: theme state
- `components/mock-login-form.tsx`: demo login client flow
- `components/logout-button.tsx`: session cleanup flow
- `lib/mock-data.ts`: template seed source only
- `lib/data-store.ts`: Mongo-backed runtime repository for auth, public content, dashboard data, and writes
- `lib/auth.ts`: cookie session helpers
- `lib/validation.ts`: shared sanitization and validation helpers for login and local APIs
- `lib/mongodb.ts`: MongoDB client utility
- `lib/seed-database.ts`: collection bootstrap logic for direct Mongo template upload

## Working rules

- Keep the design system centralized in `app/globals.css`.
- Keep public and dashboard copy concise. Prefer short headings, short support text, and direct action labels.
- Prefer editing runtime read/write logic in `lib/data-store.ts`; use `lib/mock-data.ts` only when changing the bootstrap template set.
- When adding a role capability, update:
  1. Dashboard content
  2. API route authorization
  3. `AGENTS.md` or this guide if the pattern becomes a project convention
- Do not connect Firebase auth until the team is ready to replace the mock flow end-to-end.
- Keep route handlers JSON-based and route all runtime reads/writes through `lib/data-store.ts`.
- Reuse `lib/validation.ts` when adding or expanding form-based local API inputs so mobile UI and backend rules stay aligned.
- Before first use against a new cluster, initialize content with `POST /api/admin/bootstrap` and the `x-bootstrap-key` header matching `MONGODB_BOOTSTRAP_KEY`.
- Interactive public modules like course popups and mock tests should read from Mongo-backed routes or repository functions, not from page-local arrays.

## Suggested next milestones

1. Seed the cloud cluster and verify all collections against live data.
2. Add media upload and content management routes.
3. Introduce hashed passwords and a safer auth provider in place of demo-password matching.
4. Swap demo auth for Firebase authentication and role claims.
