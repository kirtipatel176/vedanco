# Vedanco

A full-stack Next.js platform for job listings, candidate applications, and user profiles — powered by MongoDB, ImageKit, and Tailwind CSS.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Database | MongoDB (via Mongoose) |
| Styling | Tailwind CSS + shadcn/ui |
| Image Uploads | ImageKit.io |
| Auth | JWT via HTTP-only cookies |
| Forms | React Hook Form + Zod |

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- A **MongoDB** cluster (e.g. [MongoDB Atlas](https://cloud.mongodb.com))
- An **ImageKit.io** account (free tier is fine)

---

### 1. Clone the repository

```bash
git clone https://github.com/kirtipatel176/vedanco.git
cd vedanco
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Then fill in your values (see [Environment Variables](#environment-variables) below).

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm start
```

---

## Environment Variables

Create a `.env.local` file in the root of the project with the following keys:

```env
# ─── MongoDB ────────────────────────────────────────────────────────────
# Your MongoDB connection string (from Atlas or local instance)
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>

# ─── JWT / Auth ─────────────────────────────────────────────────────────
# A long, random secret string used to sign JWT tokens
# Generate one with: openssl rand -base64 64
JWT_SECRET=your_super_secret_jwt_key_here

# ─── ImageKit (Image Uploads) ────────────────────────────────────────────
# Find these in: https://imagekit.io/dashboard/developer/api-keys
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=public_xxxxxxxxxxxxxxxxxxxx
IMAGEKIT_PRIVATE_KEY=private_xxxxxxxxxxxxxxxxxxxx
```

### Where to get each value

| Variable | Where to find it |
|---|---|
| `MONGODB_URI` | [MongoDB Atlas](https://cloud.mongodb.com) → Connect → Drivers → Copy connection string |
| `JWT_SECRET` | Generate with `openssl rand -base64 64` in your terminal |
| `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT` | [ImageKit Dashboard](https://imagekit.io/dashboard/developer/api-keys) → URL Endpoint |
| `NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY` | [ImageKit Dashboard](https://imagekit.io/dashboard/developer/api-keys) → Public Key |
| `IMAGEKIT_PRIVATE_KEY` | [ImageKit Dashboard](https://imagekit.io/dashboard/developer/api-keys) → Private Key |

> **Important:** Never commit `.env.local` to version control. It is already in `.gitignore`.

---

## Project Structure

```
src/
├── app/
│   ├── (site)/          # Public-facing pages (Home, Careers, Contact, About)
│   ├── (dashboard)/     # Authenticated dashboard (Jobs, Applications, Profile)
│   └── api/             # Next.js API routes (auth, contact, imagekit, upload)
├── components/          # Shared UI components
├── context/             # Auth context provider
├── lib/
│   ├── actions/         # Server actions (users, jobs, applications)
│   └── db.ts            # MongoDB connection helper
└── models/              # Mongoose models (User, Job, Application)
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build production bundle |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## License

This project is private and proprietary. All rights reserved.
