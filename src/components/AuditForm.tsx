'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToolName, AuditInput, ToolEntry } from '@/types';

const TOOLS: ToolName[] = ['Cursor', 'GitHub Copilot', 'Claude', 'ChatGPT', 'Anthropic API', 'OpenAI API', 'Gemini', 'Windsurf'];

const PLANS: Record<ToolName, string[]> = {
  'Cursor': ['Basic', 'Pro', 'Business', 'Enterprise'],
  'GitHub Copilot': ['Individual', 'Business', 'Enterprise'],
  'Claude': ['Free', 'Pro', 'Max', 'Team', 'Enterprise'],
  'ChatGPT': ['Free', 'Plus', 'Team', 'Enterprise'],
  'Anthropic API': ['Pay-as-you-go'],
  'OpenAI API': ['Pay-as-you-go'],
  'Gemini': ['Free', 'Advanced'],
  'Windsurf': ['Free', 'Pro'],
};

const USE_CASES = ['coding', 'writing', 'data', 'research', 'mixed'];

const inputStyle = {
  width: '100%',
  backgroundColor: '#111111',
  border: '1px solid #2a2a2a',
  borderRadius: '8px',
  padding: '10px 14px',
  color: '#f5f5f5',
  fontSize: '14px',
  outline: 'none',
};

const labelStyle = {
  display: 'block',
  fontSize: '12px',
  fontWeight: 600,
  color: '#737373',
  marginBottom: '6px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
};

export default function AuditForm() {
  const router = useRouter();
  const [teamSize, setTeamSize] = useState(5);
  const [useCase, setUseCase] = useState<AuditInput['primaryUseCase']>('coding');
  const [entries, setEntries] = useState<ToolEntry[]>([
    { toolName: 'Cursor', plan: 'Pro', monthlySpend: 20, seats: 1 },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('spendlens_form');
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      if (parsed.entries) {
        setEntries(parsed.entries); // eslint-disable-line react-hooks/set-state-in-effect
      }
      if (parsed.teamSize) {
        setTeamSize(parsed.teamSize); // eslint-disable-line react-hooks/set-state-in-effect
      }
      if (parsed.useCase) {
        setUseCase(parsed.useCase); // eslint-disable-line react-hooks/set-state-in-effect
      }
    } catch {}
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const save = (newEntries: ToolEntry[], ts: number, uc: string) => {
    localStorage.setItem('spendlens_form', JSON.stringify({ entries: newEntries, teamSize: ts, useCase: uc }));
  };

  const addTool = () => {
    const newEntries = [...entries, { toolName: 'ChatGPT' as ToolName, plan: 'Plus', monthlySpend: 20, seats: 1 }];
    setEntries(newEntries);
    save(newEntries, teamSize, useCase);
  };

  const removeTool = (index: number) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
    save(newEntries, teamSize, useCase);
  };

  const updateEntry = (index: number, field: keyof ToolEntry, value: string | number) => {
    const updated = [...entries];
    if (field === 'toolName') {
      const newTool = value as ToolName;
      updated[index] = { ...updated[index], toolName: newTool, plan: PLANS[newTool][0] };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setEntries(updated);
    save(updated, teamSize, useCase);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolEntries: entries, teamSize, primaryUseCase: useCase }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push(`/results/${data.slug}`);
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px 80px' }}>
      
      {/* Team Info */}
      <div style={{ backgroundColor: '#0f0f0f', border: '1px solid #1f1f1f', borderRadius: '16px', padding: '32px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '24px', color: '#f5f5f5' }}>Team Info</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Team Size</label>
            <input type="number" min={1} value={teamSize}
              onChange={e => { setTeamSize(Number(e.target.value)); save(entries, Number(e.target.value), useCase); }}
              style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Primary Use Case</label>
            <select value={useCase}
              onChange={e => { setUseCase(e.target.value as AuditInput['primaryUseCase']); save(entries, teamSize, e.target.value); }}
              style={inputStyle}>
              {USE_CASES.map(u => <option key={u} value={u}>{u.charAt(0).toUpperCase() + u.slice(1)}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Tools */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: '#f5f5f5' }}>Your AI Tools</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {entries.map((entry, i) => (
            <div key={i} style={{ backgroundColor: '#0f0f0f', border: '1px solid #1f1f1f', borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: entries.length > 1 ? '16px' : '0' }}>
                <div>
                  <label style={labelStyle}>Tool</label>
                  <select value={entry.toolName} onChange={e => updateEntry(i, 'toolName', e.target.value)} style={inputStyle}>
                    {TOOLS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Plan</label>
                  <select value={entry.plan} onChange={e => updateEntry(i, 'plan', e.target.value)} style={inputStyle}>
                    {PLANS[entry.toolName].map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Monthly Spend ($)</label>
                  <input type="number" min={0} value={entry.monthlySpend}
                    onChange={e => updateEntry(i, 'monthlySpend', Number(e.target.value))}
                    style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Seats</label>
                  <input type="number" min={1} value={entry.seats}
                    onChange={e => updateEntry(i, 'seats', Number(e.target.value))}
                    style={inputStyle} />
                </div>
              </div>
              {entries.length > 1 && (
                <button onClick={() => removeTool(i)}
                  style={{ fontSize: '12px', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  Remove tool
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add tool */}
      <button onClick={addTool} style={{ width: '100%', padding: '14px', backgroundColor: 'transparent', border: '1px dashed #2a2a2a', borderRadius: '12px', color: '#525252', fontSize: '14px', cursor: 'pointer', marginBottom: '24px' }}>
        + Add Another Tool
      </button>

      {error && <p style={{ color: '#ef4444', fontSize: '14px', marginBottom: '16px' }}>{error}</p>}

      {/* Honeypot for spam */}
      <input type="text" name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

      {/* Submit */}
      <button onClick={handleSubmit} disabled={loading}
        style={{ width: '100%', padding: '18px', backgroundColor: loading ? '#a07830' : '#d4a853', color: '#0a0a0a', borderRadius: '12px', fontSize: '16px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', border: 'none', transition: 'all 0.2s' }}>
        {loading ? 'Analyzing your stack...' : 'Run Free Audit →'}
      </button>

      <p style={{ textAlign: 'center', fontSize: '12px', color: '#404040', marginTop: '16px' }}>
        No account needed · Results in seconds · 100% free
      </p>
    </div>
  );
}
