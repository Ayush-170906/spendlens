# Metrics

## North Star Metric

**Audits completed per week**

Why: An audit completed means a user got value from the tool. Everything else (leads, consultations, revenue) flows from this. DAU would be wrong — this is a tool people use once a quarter, not daily.

## 3 Input Metrics

1. **Landing page → audit start rate** — Are visitors convinced enough to try it? Target: 40%+
2. **Audit start → audit completion rate** — Is the form friction low enough? Target: 80%+
3. **Audit completion → email capture rate** — Is the result valuable enough to share email? Target: 25%+

## What to instrument first

1. Audit completion event (already tracked via Supabase insert)
2. Email capture event (tracked via leads table)
3. Results page share click (Twitter/copy link)
4. Landing page CTA click (audit start)

## Pivot trigger

If audit completion → email capture rate drops below 10% after 500 audits, the audit results are not valuable enough. This triggers a redesign of the results page or a revisit of the audit engine logic.

If landing page → audit start rate is below 20%, the hero copy or value proposition is not landing. This triggers an A/B test on the headline.
