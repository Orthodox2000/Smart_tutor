# SmartIQ Team Guide

## What exists now

- Public landing page with polished institute storytelling and animated sections.
- Mock authentication using local demo accounts and an HTTP-only session cookie.
- Role-aware dashboard shell for guest, student, educator, and admin.
- Local API routes for auth, dashboard, courses, messages, tests, users, and institute data.
- MongoDB utility prepared for future persistence through `MONGODB_URI`.

## Demo credentials

- Guest: `guest@smartiq.demo` / `Guest@123`
- Student: `riya@smartiq.demo` / `Student@123`
- Educator: `amit@smartiq.demo` / `Educator@123`
- Admin: `admin@smartiq.demo` / `Admin@123`

## Core files

- `app/page.tsx`: landing page
- `app/login/page.tsx`: mock login
- `app/dashboard/page.tsx`: role-aware dashboard
- `app/mock-test/page.tsx`: interactive mock-test experience
- `app/api/**/route.ts`: local APIs
- `components/theme-provider.tsx`: theme state
- `components/mock-login-form.tsx`: demo login client flow
- `components/logout-button.tsx`: session cleanup flow
- `lib/mock-data.ts`: shared role data and mock content
- `lib/auth.ts`: cookie session helpers
- `lib/mongodb.ts`: MongoDB client utility

## Working rules

- Keep the design system centralized in `app/globals.css`.
- Prefer editing data structures in `lib/mock-data.ts` before hardcoding content in pages.
- When adding a role capability, update:
  1. Dashboard content
  2. API route authorization
  3. `AGENTS.md` or this guide if the pattern becomes a project convention
- Do not connect Firebase auth until the team is ready to replace the mock flow end-to-end.
- Keep route handlers JSON-based and easy to swap to real persistence later.
- Interactive public modules like course popups and mock tests should read from `lib/mock-data.ts` or a local `app/api/**/route.ts` endpoint first, not from page-local arrays.

## Suggested next milestones

1. Replace mock route writes with MongoDB collections.
2. Add media upload and content management routes.
3. Introduce real dashboard forms for tests, user creation, and announcements.
4. Swap mock auth for Firebase authentication and role claims.
