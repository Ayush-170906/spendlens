import AuditForm from '@/components/AuditForm';
import Link from 'next/link';

export default function AuditPage() {
  return (
    <main style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#f5f5f5', fontFamily: 'Inter, -apple-system, sans-serif' }}>
      
      {/* Nav */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 48px', borderBottom: '1px solid #1f1f1f' }}>
        <Link href="/" style={{ fontSize: '22px', fontWeight: 700, color: '#d4a853', textDecoration: 'none', letterSpacing: '-0.5px' }}>SpendLens</Link>
        <span style={{ fontSize: '13px', color: '#525252' }}>Free · No signup required</span>
      </nav>

      {/* Header */}
      <section style={{ textAlign: 'center', padding: '64px 24px 40px' }}>
        <h1 style={{ fontSize: '40px', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: '12px' }}>
          Audit Your <span style={{ color: '#d4a853' }}>AI Stack</span>
        </h1>
        <p style={{ color: '#525252', fontSize: '16px' }}>Add the tools you pay for and get your instant savings report.</p>
      </section>

      {/* Form */}
      <AuditForm />

    </main>
  );
}
