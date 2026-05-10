import { NextRequest, NextResponse } from 'next/server';
import { runAudit } from '@/lib/auditEngine';
import { generateAuditSummary } from '@/lib/gemini';
import { supabase } from '@/lib/supabase';
import { nanoid } from 'nanoid';
import { AuditInput } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: AuditInput = await request.json();

    if (!body.toolEntries || body.toolEntries.length === 0) {
      return NextResponse.json({ error: 'No tools provided' }, { status: 400 });
    }

    const auditResult = runAudit(body);
    const aiSummary = await generateAuditSummary(auditResult, body.teamSize, body.primaryUseCase);
    const slug = nanoid(10);

    const { error } = await supabase.from('audits').insert({
      slug,
      tools: body.toolEntries,
      total_monthly_savings: auditResult.totalMonthlySavings,
      total_annual_savings: auditResult.totalAnnualSavings,
      ai_summary: aiSummary,
      team_size: body.teamSize,
    });

    if (error) throw error;

    return NextResponse.json({
      ...auditResult,
      aiSummary,
      slug,
    });
  } catch (error) {
    console.error('Audit error:', error);
    return NextResponse.json({ error: 'Failed to process audit' }, { status: 500 });
  }
}
