import React, { useState } from 'react';
import { Copy, Check, Terminal, CheckCircle2, ExternalLink, BookOpen } from 'lucide-react';
import { Card3D } from './Card3D';

export function TopicView({ sectionData, showToast }) {
  const [activeTabs, setActiveTabs] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  if (!sectionData) return null;

  const handleTabChange = (itemId, tabName) => {
    setActiveTabs(prev => ({ ...prev, [itemId]: tabName }));
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast("Copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div>
      <div className="header-banner">
        <h1 className="header-banner-title">{sectionData.title}</h1>
        <p className="header-banner-desc">{sectionData.subtitle}</p>
      </div>

      {/* Useful Links Section */}
      {sectionData.usefulLinks && sectionData.usefulLinks.length > 0 && (
        <div className="glass-card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
            <BookOpen size={18} />
            Useful Documentation & Resources
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {sectionData.usefulLinks.map((link, idx) => (
              <a 
                key={idx}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(56, 189, 248, 0.08)',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  color: 'var(--primary)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => { e.target.style.background = 'rgba(56, 189, 248, 0.18)'; e.target.style.borderColor = 'var(--primary)'; }}
                onMouseLeave={(e) => { e.target.style.background = 'rgba(56, 189, 248, 0.08)'; e.target.style.borderColor = 'rgba(56, 189, 248, 0.2)'; }}
              >
                <span>{link.label}</span>
                <ExternalLink size={12} />
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="section-header">
        <h2 className="section-title">
          <span>{sectionData.items?.length || 0} Knowledge Modules</span>
        </h2>
      </div>

      {sectionData.items?.map((item) => {
        const currentTab = activeTabs[item.id] || 'overview';

        return (
          <Card3D key={item.id} className="command-card" intensity={6}>
            <div className="command-header">
              <div className="command-name">
                <Terminal size={18} />
                <span>{item.name}</span>
              </div>
              <span className="tag-badge">{item.category}</span>
            </div>

            {/* Navigation Tabs */}
            <div className="tabs-nav">
              <button 
                className={`tab-btn ${currentTab === 'overview' ? 'active' : ''}`}
                onClick={() => handleTabChange(item.id, 'overview')}
              >
                Why & Outcome
              </button>
              <button 
                className={`tab-btn ${currentTab === 'syntax' ? 'active' : ''}`}
                onClick={() => handleTabChange(item.id, 'syntax')}
              >
                Command Syntax & Examples
              </button>
              <button 
                className={`tab-btn ${currentTab === 'output' ? 'active' : ''}`}
                onClick={() => handleTabChange(item.id, 'output')}
              >
                Sample Terminal Output
              </button>
              <button 
                className={`tab-btn ${currentTab === 'scenarios' ? 'active' : ''}`}
                onClick={() => handleTabChange(item.id, 'scenarios')}
              >
                Use Cases & Scenarios
              </button>
            </div>

            {/* Tab Contents */}
            <div className="tab-content">
              {currentTab === 'overview' && (
                <div>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <h4 style={{ color: 'var(--primary)', marginBottom: '0.4rem', fontSize: '0.95rem' }}>What is it?</h4>
                    <p style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{item.summary}</p>
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <h4 style={{ color: 'var(--accent-amber)', marginBottom: '0.4rem', fontSize: '0.95rem' }}>Why are we doing this?</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{item.why}</p>
                  </div>

                  <div>
                    <h4 style={{ color: 'var(--accent-green)', marginBottom: '0.4rem', fontSize: '0.95rem' }}>What is the outcome?</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{item.outcome}</p>
                  </div>
                </div>
              )}

              {currentTab === 'syntax' && (
                <div>
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600 }}>GENERAL SYNTAX:</span>
                    <div className="code-block">
                      <button 
                        className="code-copy-btn"
                        onClick={() => copyToClipboard(item.syntax, `${item.id}-syntax`)}
                      >
                        {copiedId === `${item.id}-syntax` ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedId === `${item.id}-syntax` ? 'Copied' : 'Copy'}</span>
                      </button>
                      {item.syntax}
                    </div>
                  </div>

                  {item.examples?.map((ex, idx) => (
                    <div key={idx} style={{ marginTop: '1.25rem' }}>
                      <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                        💡 {ex.title}
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '0.4rem' }}>
                        {ex.explanation}
                      </p>
                      <div className="code-block">
                        <button 
                          className="code-copy-btn"
                          onClick={() => copyToClipboard(ex.command, `${item.id}-ex-${idx}`)}
                        >
                          {copiedId === `${item.id}-ex-${idx}` ? <Check size={14} /> : <Copy size={14} />}
                          <span>{copiedId === `${item.id}-ex-${idx}` ? 'Copied' : 'Copy'}</span>
                        </button>
                        {ex.command}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {currentTab === 'output' && (
                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600 }}>EXPECTED TERMINAL RESPONSE:</span>
                  <div className="code-block" style={{ background: '#030712', color: '#34d399', borderColor: 'rgba(52, 211, 153, 0.3)' }}>
                    <button 
                      className="code-copy-btn"
                      onClick={() => copyToClipboard(item.sampleOutput, `${item.id}-output`)}
                    >
                      {copiedId === `${item.id}-output` ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedId === `${item.id}-output` ? 'Copied' : 'Copy'}</span>
                    </button>
                    {item.sampleOutput}
                  </div>
                </div>
              )}

              {currentTab === 'scenarios' && (
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--primary)', marginBottom: '0.75rem' }}>Real-World Engineering Use Cases</h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {item.useCases?.map((uc, uIdx) => (
                      <li key={uIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'var(--text-muted)' }}>
                        <CheckCircle2 size={16} color="var(--accent-green)" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                        <span>{uc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card3D>
        );
      })}
    </div>
  );
}
