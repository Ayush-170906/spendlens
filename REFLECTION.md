# Reflection

## 1. Hardest bug this week

The hardest bug was the Supabase permission denied error (code 42501). After setting up Row Level Security policies that explicitly allowed INSERT for the anon role, inserts were still failing. My first hypothesis was that the publishable key was wrong — I checked it three times. My second hypothesis was that the Supabase client was not initializing correctly — I added console logs and confirmed it was connecting. My third hypothesis was that RLS policies alone are not enough without explicit GRANT statements — this turned out to be correct. Supabase changed their default behavior so that even with permissive RLS policies, you must explicitly GRANT table privileges to the anon role. Running GRANT INSERT, SELECT, UPDATE ON public.audits TO anon fixed it immediately.

## 2. A decision I reversed mid-week

I initially planned to use Netlify for deployment because it was already open in my browser. After starting the setup I realized Netlify has known issues with Next.js API routes and edge functions. Next.js is built by Vercel and Vercel deploys it with zero configuration and full support for all Next.js features. I switched to Vercel and the deployment worked on the first attempt with no configuration changes needed.

## 3. What I would build in week 2

In week 2 I would build the benchmark mode — showing users how their AI spend per developer compares to companies of similar size. I would also add PDF export of the full report so users can share it in team meetings. The embeddable widget would be a strong growth driver — a blogger writing about AI tools could drop a script tag and their readers get an audit widget inline. I would also set up proper analytics to track the funnel from landing page to audit completion to lead capture.

## 4. How I used AI tools

I used Google Antigravity as my primary IDE — its agent mode scaffolded components, fixed TypeScript errors, and generated boilerplate. I used Claude for architecture decisions, reviewing audit engine logic, and writing documentation. I did not trust AI for the audit engine math — I wrote the logic myself and verified every recommendation manually against official pricing pages. One specific time the AI was wrong: the agent generated the results page with params.slug accessed directly, which crashed in Next.js 16 because params is now a Promise that must be awaited. I caught this from the error log and fixed it manually.

## 5. Self-ratings

- **Discipline: 7/10** — Started late due to setup complexity but executed well under pressure once started.
- **Code quality: 7/10** — TypeScript throughout, sensible abstractions, but test coverage could be broader.
- **Design sense: 8/10** — Dark luxury theme with gold accents looks premium and is intentional for the target audience.
- **Problem solving: 8/10** — Debugged Supabase permissions, Next.js params Promise issue, and Node.js execution policy issues independently.
- **Entrepreneurial thinking: 7/10** — Understood the lead gen model, built honest audit logic, and conducted real user interviews.
