# LLM Prompts Used in SpendLens

## Audit Summary Prompt

Used in: src/lib/gemini.ts
Model: gemini-1.5-flash (Google AI Studio free tier)

### The Prompt

You are an expert AI infrastructure cost analyst. Write a 100-word personalized audit summary for a team.

Team details:
- Team size: ${teamSize} people
- Primary use case: ${useCase}
- Total monthly savings identified: $${totalMonthlySavings}
- Total annual savings identified: $${totalAnnualSavings}
- Top recommendations: ${topSavings}

Write a friendly, specific, actionable 100-word summary. Be direct about the savings opportunity. Do not use bullet points. Write in second person (you/your).

### Why I wrote it this way
- Second person makes it feel personal not generic
- 100-word limit forces conciseness
- No bullet points keeps it conversational
- Providing specific numbers grounds the output in real data

### What I tried that didn't work
- Asking for markdown formatting produced ugly output
- Not specifying length got 300 word essays
- Asking it to be creative produced generic marketing copy

### Fallback
If Gemini API fails, system falls back to a templated summary using the same data.

### AI used for development
Google Antigravity was used to scaffold components. All AI output was reviewed and modified before committing.
