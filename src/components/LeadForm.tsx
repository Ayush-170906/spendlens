'use client';
import { useState } from 'react';

const inputStyle = {
  width: '100%',
  backgroundColor: '#111111',
  border: '1px solid #2a2a2a',
  borderRadius: '8px',
  padding: '10px 14px',
  color: '#f5f5f5',
  fontSize: '14px',
  outline: 'none',
  marginBottom: '12px',
};

export default function LeadForm({ slug }: { slug: string }) {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const handleSubmit = async () => {
    if (honeypot) return;
    if (!email) { setError('Email is required'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, email, companyName: company, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '24px' }}>
        <div style={{ fontSize: '32px', marginBottom: '12px' }}>✓</div>
        <p style={{ fontWeight: 600, marginBottom: '4px' }}>Report sent!</p>
        <p style={{ color: '#525252', fontSize: '14px' }}>Check your inbox for your audit summary.</p>
      </div>
    );
  }

  return (
    <div>
      <input type="text" name="website" value={honeypot} onChange={e => setHoneypot(e.target.value)}
        style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
      <input type="email" placeholder="your@email.com" value={email}
        onChange={e => setEmail(e.target.value)} style={inputStyle} />
      <input type="text" placeholder="Company name (optional)" value={company}
        onChange={e => setCompany(e.target.value)} style={inputStyle} />
      <input type="text" placeholder="Your role (optional)" value={role}
        onChange={e => setRole(e.target.value)} style={inputStyle} />
      {error && <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}
      <button onClick={handleSubmit} disabled={loading}
        style={{ width: '100%', padding: '14px', backgroundColor: '#d4a853', color: '#0a0a0a', borderRadius: '10px', border: 'none', fontWeight: 700, fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer' }}>
        {loading ? 'Sending...' : 'Get My Report →'}
      </button>
    </div>
  );
}
