# SpendLens — Free AI Spend Audit Tool

SpendLens helps startup founders and engineering managers instantly audit their AI tool spend, find overspend, and get specific recommendations to save money — free, no login required.

## Screenshots
![Landing Page](https://spendlens-beryl.vercel.app)

## Live URL
https://spendlens-beryl.vercel.app

## Quick Start

### Install
npm install

### Run locally
npm run dev

### Run tests
npm test

### Deploy
Push to main — Vercel auto-deploys.

## Decisions

1. **Next.js over plain React** — API routes, SSR for results page, and Vercel deployment are all native. No separate backend needed.

2. **Hardcoded audit rules over AI** — The audit math uses deterministic logic. A finance person should be able to verify every recommendation. AI is only used for the summary paragraph where natural language adds value.

3. **Gemini over Anthropic API** — No budget for API credits. Gemini 1.5 Flash is free with generous limits and produces quality summaries. Disclosed in REFLECTION.md.

4. **Supabase over Firebase** — Postgres gives us proper relational queries. Row Level Security is built-in. Free tier is generous enough for this scale.

5. **nanoid for slugs over UUID** — Shorter, URL-friendly, and still collision-resistant enough for this scale. UUIDs would make shareable URLs ugly.
