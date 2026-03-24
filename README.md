# Smart Tutor

Smart Tutor is a local-first Next.js 16 web app for an educational institute in Vashi. The current implementation focuses on a polished landing page, mock role-based access, local API routes, and a MongoDB-ready backend utility while keeping Firebase auth intentionally deferred.

## Tech Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS v4
- MongoDB Node driver
- Vercel-ready deployment structure

## Demo Accounts

- `guest@smarttutor.demo` / `Guest@123`
- `riya@smarttutor.demo` / `Student@123`
- `amit@smarttutor.demo` / `Educator@123`
- `admin@smarttutor.demo` / `Admin@123`

## Local API Routes

- `GET /api/institute`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/session`
- `GET /api/dashboard`
- `GET, POST /api/courses`
- `GET, POST /api/messages`
- `GET, POST /api/tests`
- `GET, POST /api/users`

## Environment

Create a local environment file from `.env.example` and provide:

```bash
MONGODB_URI=your-mongodb-uri
```

The app currently uses mock in-memory content for UI development, but `lib/mongodb.ts` is ready for route-level persistence work.

## Team Notes

See `docs/TEAM_GUIDE.md` and `AGENTS.md` for project conventions, role rules, and collaboration expectations.
