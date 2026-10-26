# YT Roast — 8-bit Retro Terminal Edition

A savage, gamified web application that connects via Google Auth & YouTube Data API v3, analyzes your watch history and subscriptions, and computes brutal AI roasts with an official **Brainrot Score** and red flag detector.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (Custom 8-bit / Arcade Retro Terminal UI with CRT scanlines)
- **Auth:** NextAuth.js (Google Provider with YouTube Read-Only Scopes)
- **AI:** Google Gemini API (with fallback mock roast generation)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure your `.env` file based on `.env.example`:
   ```env
   NEXTAUTH_SECRET=your-secret
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GEMINI_API_KEY=your-gemini-api-key
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.
