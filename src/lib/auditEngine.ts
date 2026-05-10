import { AuditInput, AuditResult, FullAuditResult } from '../types';
import { pricingData } from './pricingData';

export function runAudit(input: AuditInput): Omit<FullAuditResult, 'aiSummary' | 'slug'> {
  const auditResults: AuditResult[] = [];

  for (const entry of input.toolEntries) {
    const { toolName, plan, monthlySpend, seats } = entry;
    const plans = pricingData[toolName];
    const currentPlan = plans?.find(p => p.name === plan);
    const officialPrice = currentPlan ? currentPlan.pricePerSeatMonthly * seats : monthlySpend;
    
    let recommendedAction = 'No change needed';
    let savings = 0;
    let reason = 'Your current plan is optimal for your team size and usage.';

    // Check overpaying vs official price
    if (monthlySpend > officialPrice && officialPrice > 0) {
      savings = monthlySpend - officialPrice;
      recommendedAction = `Verify your billing — you may be overpaying`;
      reason = `Official price for ${seats} seats on ${plan} is $${officialPrice}/mo but you report paying $${monthlySpend}/mo.`;
    }

    // Check wrong plan for team size
    if (seats <= 2 && (plan === 'Team' || plan === 'Business' || plan === 'Enterprise')) {
      const individualPlan = plans?.find(p => p.name === 'Individual' || p.name === 'Pro');
      if (individualPlan) {
        const cheaperCost = individualPlan.pricePerSeatMonthly * seats;
        if (monthlySpend > cheaperCost) {
          savings = monthlySpend - cheaperCost;
          recommendedAction = `Downgrade to ${individualPlan.name} plan`;
          reason = `With only ${seats} seat(s), ${individualPlan.name} at $${cheaperCost}/mo gives the same core features as ${plan}.`;
        }
      }
    }

    // Use case based recommendations
    if (input.primaryUseCase === 'coding' && toolName === 'ChatGPT' && monthlySpend > 0) {
      savings = Math.max(savings, monthlySpend - 20);
      recommendedAction = 'Switch to Cursor Pro for coding';
      reason = 'Cursor Pro at $20/seat is purpose-built for coding with better IDE integration than ChatGPT.';
    }

    if (input.primaryUseCase === 'writing' && toolName === 'ChatGPT' && plan === 'Team') {
      const claudeSavings = monthlySpend - (20 * seats);
      if (claudeSavings > 0) {
        savings = Math.max(savings, claudeSavings);
        recommendedAction = 'Switch to Claude Pro for writing';
        reason = 'Claude Pro at $20/seat is consistently rated better for long-form writing tasks.';
      }
    }

    auditResults.push({
      toolName,
      currentSpend: monthlySpend,
      recommendedAction,
      savings: Math.max(0, savings),
      reason,
    });
  }

  const totalMonthlySavings = auditResults.reduce((sum, r) => sum + r.savings, 0);
  const totalAnnualSavings = totalMonthlySavings * 12;

  return { auditResults, totalMonthlySavings, totalAnnualSavings };
}
