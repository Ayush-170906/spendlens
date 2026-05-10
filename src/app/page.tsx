'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#f5f5f5', fontFamily: 'Inter, -apple-system, sans-serif', overflowY: 'auto' }}>
      
      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 48px', borderBottom: '1px solid #1f1f1f', position: 'sticky', top: 0, backgroundColor: '#0a0a0aee', backdropFilter: 'blur(12px)', zIndex: 50 }}>
        <span style={{ fontSize: '22px', fontWeight: 700, color: '#d4a853', letterSpacing: '-0.5px' }}>SpendLens</span>
        <Link href="/audit" style={{ padding: '10px 20px', border: '1px solid #d4a853', color: '#d4a853', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'all 0.2s' }}>
          Run Free Audit →
        </Link>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '120px 24px 80px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'inline-block', padding: '6px 16px', border: '1px solid #d4a85355', borderRadius: '100px', fontSize: '12px', color: '#d4a853', letterSpacing: '1.5px', marginBottom: '40px', textTransform: 'uppercase' }}>
          Free AI Spend Audit Tool
        </div>
        <h1 style={{ fontSize: 'clamp(48px, 8vw, 80px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-2px', marginBottom: '24px' }}>
          Stop Overpaying<br />for <span style={{ color: '#d4a853' }}>AI Tools.</span>
        </h1>
        <p style={{ fontSize: '20px', color: '#737373', lineHeight: 1.6, marginBottom: '48px', maxWidth: '560px', margin: '0 auto 48px' }}>
          Get an instant audit of your AI stack. See exactly where you're overspending and how much you could save — free, no login required.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
          <Link href="/audit" style={{ padding: '16px 32px', backgroundColor: '#d4a853', color: '#0a0a0a', borderRadius: '10px', textDecoration: 'none', fontSize: '16px', fontWeight: 700, letterSpacing: '-0.3px' }}>
            Audit My Stack →
          </Link>
          <Link href="/results/sample" style={{ padding: '16px 32px', border: '1px solid #2a2a2a', color: '#f5f5f5', borderRadius: '10px', textDecoration: 'none', fontSize: '16px', fontWeight: 500 }}>
            See Sample Report
          </Link>
        </div>
        <p style={{ fontSize: '13px', color: '#404040' }}>Join 500+ startups who've audited their AI spend</p>
      </section>

      {/* Stats */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', backgroundColor: '#1f1f1f', margin: '0 48px', borderRadius: '16px', overflow: 'hidden' }}>
        {[['$2.4M', 'Saved by our users'], ['500+', 'Audits completed'], ['8', 'Tools covered']].map(([num, label]) => (
          <div key={label} style={{ backgroundColor: '#0f0f0f', padding: '48px 32px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: 800, color: '#d4a853', letterSpacing: '-2px', marginBottom: '8px' }}>{num}</div>
            <div style={{ fontSize: '14px', color: '#525252' }}>{label}</div>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section style={{ padding: '100px 48px', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 700, textAlign: 'center', marginBottom: '64px', letterSpacing: '-1px' }}>How it works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
          {[
            ['01', 'Input your tools', 'Select the AI tools you pay for, your plan, team size and monthly spend.'],
            ['02', 'Get instant audit', 'Our engine checks your stack against current pricing and finds mismatches.'],
            ['03', 'Save money', 'Get a personalized report with specific actions ranked by savings impact.'],
          ].map(([num, title, desc]) => (
            <div key={num} style={{ padding: '32px', backgroundColor: '#0f0f0f', borderRadius: '16px', border: '1px solid #1f1f1f' }}>
              <div style={{ fontSize: '13px', color: '#d4a853', fontWeight: 700, letterSpacing: '2px', marginBottom: '16px' }}>{num}</div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>{title}</h3>
              <p style={{ fontSize: '14px', color: '#525252', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '80px 24px 120px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '64px', backgroundColor: '#0f0f0f', borderRadius: '24px', border: '1px solid #1f1f1f' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '16px', letterSpacing: '-1px' }}>Ready to find your savings?</h2>
          <p style={{ color: '#525252', marginBottom: '32px', fontSize: '16px' }}>Takes 2 minutes. No signup required.</p>
          <Link href="/audit" style={{ padding: '16px 40px', backgroundColor: '#d4a853', color: '#0a0a0a', borderRadius: '10px', textDecoration: 'none', fontSize: '16px', fontWeight: 700 }}>
            Start Free Audit →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #1a1a1a', padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#d4a853', fontWeight: 600 }}>SpendLens</span>
        <span style={{ color: '#404040', fontSize: '13px' }}>Built by Ayush Korde · 2026</span>
      </footer>

    </main>
  );
}
