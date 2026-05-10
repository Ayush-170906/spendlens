import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import LeadForm from '@/components/LeadForm';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return {
    title: 'Your AI Spend Audit — SpendLens',
    description: 'See your personalized AI tool spend audit and savings report.',
    openGraph: {
      title: 'My AI Spend Audit — SpendLens',
      description: 'I just audited my AI stack and found potential savings. Check yours free.',
      url: `${process.env.NEXT_PUBLIC_APP_URL}/results/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'My AI Spend Audit — SpendLens',
      description: 'I just audited my AI stack and found potential savings. Check yours free.',
    },
  };
}

export default async function ResultsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: audit, error } = await supabase
    .from('audits')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !audit) notFound();

  const totalMonthly = audit.total_monthly_savings || 0;
  const totalAnnual = audit.total_annual_savings || 0;
  const tools = audit.tools || [];
  const isHighSavings = totalMonthly > 500;
  const isOptimal = totalMonthly < 100;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return (
    <main style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#f5f5f5', fontFamily: 'Inter, -apple-system, sans-serif' }}>

      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 48px', borderBottom: '1px solid #1f1f1f' }}>
        <Link href="/" style={{ fontSize: '22px', fontWeight: 700, color: '#d4a853', textDecoration: 'none' }}>SpendLens</Link>
        <Link href="/audit" style={{ padding: '10px 20px', border: '1px solid #d4a853', color: '#d4a853', borderRadius: '8px', textDecoration: 'none', fontSize: '14px' }}>
          New Audit →
        </Link>
      </nav>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Hero savings */}
        <div style={{ backgroundColor: '#0f0f0f', border: '1px solid #1f1f1f', borderRadius: '24px', padding: '48px', textAlign: 'center', marginBottom: '24px' }}>
          <p style={{ fontSize: '13px', color: '#525252', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px' }}>Potential Savings Identified</p>
          <div style={{ fontSize: 'clamp(56px, 10vw, 88px)', fontWeight: 800, color: '#d4a853', letterSpacing: '-3px', lineHeight: 1, marginBottom: '8px' }}>
            ${totalMonthly.toLocaleString()}
          </div>
          <p style={{ color: '#525252', fontSize: '16px', marginBottom: '24px' }}>per month · <span style={{ color: '#737373' }}>${totalAnnual.toLocaleString()} per year</span></p>
          {isOptimal && (
            <div style={{ display: 'inline-block', padding: '8px 20px', backgroundColor: '#0a2a0a', border: '1px solid #1a5a1a', borderRadius: '100px', color: '#4ade80', fontSize: '14px' }}>
              ✓ You&apos;re spending well — stack is optimized
            </div>
          )}
        </div>

        {/* AI Summary */}
        {audit.ai_summary && (
          <div style={{ backgroundColor: '#0f0f0f', border: '1px solid #1f1f1f', borderRadius: '16px', padding: '32px', marginBottom: '24px' }}>
            <p style={{ fontSize: '12px', color: '#d4a853', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px' }}>AI Analysis</p>
            <p style={{ color: '#a3a3a3', lineHeight: 1.7, fontSize: '15px' }}>{audit.ai_summary}</p>
          </div>
        )}

        {/* Per tool breakdown */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Tool Breakdown</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {tools.map((tool: { toolName: string; plan: string; monthlySpend: number; seats: number }, i: number) => (
              <div key={i} style={{ backgroundColor: '#0f0f0f', border: '1px solid #1f1f1f', borderRadius: '16px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 600, marginBottom: '4px' }}>{tool.toolName}</p>
                  <p style={{ fontSize: '13px', color: '#525252' }}>{tool.plan} · {tool.seats} seat{tool.seats > 1 ? 's' : ''}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '20px', fontWeight: 700 }}>${tool.monthlySpend}/mo</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Credex CTA */}
        {isHighSavings && (
          <div style={{ backgroundColor: '#1a0f00', border: '1px solid #d4a85344', borderRadius: '16px', padding: '32px', marginBottom: '24px', textAlign: 'center' }}>
            <p style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Save even more with Credex</p>
            <p style={{ color: '#737373', fontSize: '14px', marginBottom: '24px' }}>You have over $500/mo in savings potential. Credex offers discounted AI credits — same tools, lower cost.</p>
            <a href="https://credex.rocks" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', padding: '14px 32px', backgroundColor: '#d4a853', color: '#0a0a0a', borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '15px' }}>
              Book a Credex Consultation →
            </a>
          </div>
        )}

        {/* Lead capture */}
        <div style={{ backgroundColor: '#0f0f0f', border: '1px solid #1f1f1f', borderRadius: '16px', padding: '32px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
            {isOptimal ? 'Get notified when new optimizations apply' : 'Get your full report by email'}
          </h3>
          <p style={{ color: '#525252', fontSize: '14px', marginBottom: '24px' }}>
            {isHighSavings ? "A Credex advisor will also reach out to help you capture more savings." : "We'll send you a copy of this audit to share with your team."}
          </p>
          <LeadForm slug={slug} />
        </div>

        {/* Share */}
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <p style={{ fontSize: '13px', color: '#404040', marginBottom: '12px' }}>Share your audit</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <a href={`https://twitter.com/intent/tweet?text=I just audited my AI stack with SpendLens and found $${totalMonthly}/month in savings. Check yours free 👇&url=${appUrl}/results/${slug}`}
              target="_blank" rel="noopener noreferrer"
              style={{ padding: '10px 20px', border: '1px solid #2a2a2a', borderRadius: '8px', color: '#f5f5f5', textDecoration: 'none', fontSize: '13px' }}>
              Share on X →
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
