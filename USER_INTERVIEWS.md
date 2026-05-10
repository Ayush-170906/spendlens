# User Interviews

## Interview 1 — NK, Student Developer, Side Projects

**Role:** Developer, active on multiple hackathon teams
**Company stage:** Side projects, no revenue
**Date:** 2026-05-10
**Method:** WhatsApp chat

**Direct quotes:**
- "Cursor AI but free tier — I just use whatever is free"
- "Yes but more of using free tiers from different platforms"
- "The best way to trust it is to get some proof or authentication from the side"

**Most surprising thing:** NK actively manages his AI spend by juggling multiple free tiers across platforms — this is a real optimization strategy that the audit engine did not account for. Free tier stacking is a legitimate pattern.

**What it changed about my design:** Added honest messaging for free-tier users — the tool now acknowledges that free tier stacking is smart, not just a workaround.

---

## Interview 2 — KS, Student, Technical Profile

**Role:** Developer, college student
**Company stage:** No current AI spend
**Date:** 2026-05-10
**Method:** WhatsApp chat

**Direct quotes:**
- "As I am not paying so I am using smartly"
- "I use smart tools — switched to free alternatives"
- "The accurate responses make me use that AI"

**Most surprising thing:** KS has never paid for an AI tool and feels no need to — but immediately said yes to using SpendLens if it were relevant. This suggests the tool has future value as their usage grows.

**What it changed about my design:** The results page now handles zero-spend users gracefully with a "notify me when this applies to you" flow instead of showing irrelevant savings numbers.

---

## Interview 3 — AR, Student, Casual AI User

**Role:** Student, occasional AI user
**Company stage:** Personal use
**Date:** 2026-05-10
**Method:** WhatsApp chat

**Direct quotes:**
- "ChatGPT — just the free version"
- "Haa use karunga agar free ho" (Yes I would use it if it's free)
- "Fast aur accurate response chahiye trust ke liye" (Fast and accurate response needed for trust)

**Most surprising thing:** Even casual free users immediately said yes to a spend audit tool if it is free. The zero-friction positioning (no login, instant results) is the right call.

**What it changed about my design:** Reinforced the decision to never gate the tool behind a login. Speed and accuracy of the audit result is the primary trust signal — not brand or social proof.
