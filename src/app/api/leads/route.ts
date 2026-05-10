import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { slug, email, companyName, role, teamSize } = await request.json();

    if (!email || !slug) {
      return NextResponse.json({ error: 'Email and slug required' }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Update audit record with lead info
    const { data: audit, error: fetchError } = await supabase
      .from('audits')
      .select('total_monthly_savings')
      .eq('slug', slug)
      .single();

    if (fetchError) throw fetchError;

    await supabase.from('audits').update({
      email,
      company_name: companyName,
      role,
      team_size: teamSize,
    }).eq('slug', slug);

    // Send confirmation email
    await resend.emails.send({
      from: 'SpendLens <onboarding@resend.dev>',
      to: email,
      subject: 'Your SpendLens AI Spend Audit Report',
      html: `
        <h2>Your AI Spend Audit is Ready</h2>
        <p>Hi${companyName ? ` from ${companyName}` : ''},</p>
        <p>Thanks for using SpendLens. Your audit identified <strong>$${audit?.total_monthly_savings}/month</strong> in potential savings.</p>
        ${audit?.total_monthly_savings > 500 ? `<p><strong>Because your savings opportunity exceeds $500/month, a Credex advisor will reach out to help you capture even more savings through discounted AI credits.</strong></p>` : ''}
        <p>View your full report anytime at: ${process.env.NEXT_PUBLIC_APP_URL}/results/${slug}</p>
        <br/>
        <p>— Team SpendLens</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
  }
}
