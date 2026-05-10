import { GoogleGenerativeAI } from '@google/generative-ai';
import { FullAuditResult } from '../types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function generateAuditSummary(
  auditResult: Omit<FullAuditResult, 'aiSummary' | 'slug'>,
  teamSize: number,
  useCase: string
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const topSavings = auditResult.auditResults
      .filter(r => r.savings > 0)
      .sort((a, b) => b.savings - a.savings)
      .slice(0, 3);

    const prompt = `You are an expert AI infrastructure cost analyst. Write a 100-word personalized audit summary for a team.

Team details:
- Team size: ${teamSize} people
- Primary use case: ${useCase}
- Total monthly savings identified: $${auditResult.totalMonthlySavings}
- Total annual savings identified: $${auditResult.totalAnnualSavings}
- Top recommendations: ${topSavings.map(r => `${r.toolName}: ${r.recommendedAction} (save $${r.savings}/mo)`).join(', ')}

Write a friendly, specific, actionable 100-word summary. Be direct about the savings opportunity. Do not use bullet points. Write in second person (you/your).`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    // Fallback if API fails
    const { totalMonthlySavings, totalAnnualSavings } = auditResult;
    if (totalMonthlySavings === 0) {
      return `Great news — your team of ${teamSize} is already spending efficiently on AI tools for ${useCase} work. Your current stack is well-optimized with no significant savings opportunities identified. We recommend revisiting this audit in 3 months as new tools and pricing changes may create opportunities. Stay subscribed to be notified when better options emerge for your specific use case.`;
    }
    return `Your team of ${teamSize} has a significant savings opportunity of $${totalMonthlySavings}/month ($${totalAnnualSavings}/year) on AI tools. For your ${useCase} workflows, our audit identified specific plan mismatches and cheaper alternatives that deliver the same capability. The recommendations above are ranked by impact — implementing even the top suggestion could meaningfully reduce your monthly AI spend. Credex can help you access the same tools at an additional discount through their credit marketplace.`;
  }
}
