## AyuTrace (Next.js + Prisma Full Stack Demo)

This project includes:
- Next.js frontend + backend (App Router + API routes)
- Prisma schema for Neon/Postgres
- Real authentication with DB users + session cookies
- Full-stack form handling for:
  - Publish herb (`/farmer/publish`)
  - Add transfer data (`/add-data`)
  - Generate QR payload (`/manufacturer/generate-qr`)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Add env values:
```bash
cp .env.example .env
```
Set your Neon URL in `DATABASE_URL`.

3. Generate Prisma client and push schema:
```bash
npm run prisma:generate
npm run prisma:push
```

4. Start app:
```bash
npm run dev
```

## Auth flow
- Register: `/auth/register`
- Login: `/auth/login`
- Current user API: `GET /api/auth/me`
- Logout API: `POST /api/auth/logout`

The publish/transfer/qr APIs now require a logged-in session.
