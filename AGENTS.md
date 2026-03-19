<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes. APIs, conventions, and file structure may all differ from training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing code and heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# SmartIQ Project Rules

## Product scope

- Build for SmartIQ Academy, a Vashi-based educational institute.
- Keep the visual design professional, colorful, and consistent.
- Light theme is the default. Dark theme must remain polished and fully usable.
- Desktop is the primary target, but every screen must remain mobile friendly.
- Contain horizontal overflow everywhere.

## Authorization model

- Roles are `guest`, `student`, `educator`, and `admin`.
- Keep role rules centralized in `lib/mock-data.ts` and `lib/auth.ts`.
- Do not add Firebase auth yet. Use the mock cookie session flow until the team explicitly replaces it.
- Guests can browse public content and preview the workspace shell only.
- Students can access personal dashboards, notices, tests, and learning material.
- Educators can manage courses, create and grade tests, and coordinate messages.
- Admins can create users, control access levels, and manage permissions.

## Architecture conventions

- Use the App Router only.
- Put local API routes under `app/api/**/route.ts`.
- Keep shared mock content in `lib/mock-data.ts`.
- Keep MongoDB connection logic in `lib/mongodb.ts`.
- Use `.env` with `MONGODB_URI` for future persistence work.
- Prefer server components for pages unless client state is required.
- Use small client components for theme switching, login actions, and logout actions.

## Team consistency

- Extend existing design tokens in `app/globals.css` rather than introducing isolated color systems.
- Reuse the same surface, section, pill, and action button styles where possible.
- Keep copy professional and institute-appropriate.
- When adding new role features, update both UI and API authorization together.
- Document any new shared pattern in `docs/TEAM_GUIDE.md`.
