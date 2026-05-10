import { runAudit } from '../lib/auditEngine';

describe('Audit Engine', () => {
  test('returns zero savings for correctly priced Cursor Pro', () => {
    const result = runAudit({
      toolEntries: [{ toolName: 'Cursor', plan: 'Pro', monthlySpend: 20, seats: 1 }],
      teamSize: 1,
      primaryUseCase: 'coding',
    });
    expect(result.totalMonthlySavings).toBe(0);
  });

  test('detects overpaying vs official price', () => {
    const result = runAudit({
      toolEntries: [{ toolName: 'Cursor', plan: 'Pro', monthlySpend: 50, seats: 1 }],
      teamSize: 1,
      primaryUseCase: 'coding',
    });
    expect(result.totalMonthlySavings).toBeGreaterThan(0);
  });

  test('recommends downgrade for small team on Business plan', () => {
    const result = runAudit({
      toolEntries: [{ toolName: 'Cursor', plan: 'Business', monthlySpend: 80, seats: 2 }],
      teamSize: 2,
      primaryUseCase: 'coding',
    });
    const cursorResult = result.auditResults.find(r => r.toolName === 'Cursor');
    expect(cursorResult?.savings).toBeGreaterThan(0);
    expect(cursorResult?.recommendedAction).toContain('Downgrade');
  });

  test('recommends Cursor for coding use case over ChatGPT', () => {
    const result = runAudit({
      toolEntries: [{ toolName: 'ChatGPT', plan: 'Plus', monthlySpend: 20, seats: 1 }],
      teamSize: 1,
      primaryUseCase: 'coding',
    });
    const chatgptResult = result.auditResults.find(r => r.toolName === 'ChatGPT');
    expect(chatgptResult?.recommendedAction).toContain('Cursor');
  });

  test('annual savings is 12x monthly savings', () => {
    const result = runAudit({
      toolEntries: [{ toolName: 'Cursor', plan: 'Pro', monthlySpend: 50, seats: 1 }],
      teamSize: 1,
      primaryUseCase: 'coding',
    });
    expect(result.totalAnnualSavings).toBe(result.totalMonthlySavings * 12);
  });

  test('handles multiple tools correctly', () => {
    const result = runAudit({
      toolEntries: [
        { toolName: 'Cursor', plan: 'Pro', monthlySpend: 20, seats: 1 },
        { toolName: 'ChatGPT', plan: 'Plus', monthlySpend: 20, seats: 1 },
      ],
      teamSize: 2,
      primaryUseCase: 'coding',
    });
    expect(result.auditResults).toHaveLength(2);
  });

  test('returns zero savings for free plan', () => {
    const result = runAudit({
      toolEntries: [{ toolName: 'Claude', plan: 'Free', monthlySpend: 0, seats: 1 }],
      teamSize: 1,
      primaryUseCase: 'writing',
    });
    expect(result.totalMonthlySavings).toBe(0);
  });
});
