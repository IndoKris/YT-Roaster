# YT Roast — Project Blueprint & Tracker

## Goal
A fun, beginner-friendly web application that connects via Google Auth / YouTube API, fetches user watch history/liked videos, and serves brutal, humorous AI roasts complete with a "Brainrot Score" and red flags.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (Vibrant playful dark theme)
- **Auth:** NextAuth.js (Google Provider)
- **AI:** Google Gemini / Groq API

## Progress
- [x] Create GitHub Repo & PRD
- [x] Scaffold Next.js project (`yt-roast`)
- [x] Build Playful Landing Page (`app/page.tsx`)
- [x] Configure NextAuth & YouTube API integration (`app/api/auth/[...nextauth]/route.ts`)
- [x] Implement AI Roast generation & Brainrot Score card (`app/api/roast/route.ts`, `app/api/youtube/route.ts`)
- [x] Add Health Diagnostics API & Dashboard Route (`app/api/health/route.ts`, `app/dashboard/page.tsx`)
- [x] Polish README and Documentation (`README.md`)
- [ ] Final Deployment (Vercel)
