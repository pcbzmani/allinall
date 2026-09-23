import React, { useState } from 'react';
import { deploymentGuideData } from '../data/deploymentGuideData';
import { Rocket, Copy, Check, CheckSquare, Square, Github, ExternalLink } from 'lucide-react';

export function DeploymentGuideView({ showToast }) {
  const [checkedSteps, setCheckedSteps] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  const toggleCheck = (stepNum) => {
    setCheckedSteps(prev => ({ ...prev, [stepNum]: !prev[stepNum] }));
  };

  const copyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    showToast("Command copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div>
      <div className="header-banner" style={{ background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(52, 211, 153, 0.15))' }}>
        <h1 className="header-banner-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Rocket size={32} color="var(--primary)" />
          GitHub & Netlify Hosting Guide
        </h1>
        <p className="header-banner-desc">
          Follow these 6 interactive steps to push your project code to a GitHub repository and deploy your site live on Netlify for free!
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        {deploymentGuideData.steps.map((s) => {
          const isDone = checkedSteps[s.step];
          return (
            <div 
              key={s.step} 
              className="glass-card"
              style={{
                borderColor: isDone ? 'var(--accent-green)' : 'var(--border-color)',
                background: isDone ? 'rgba(52, 211, 153, 0.04)' : 'var(--bg-card)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <button 
                  onClick={() => toggleCheck(s.step)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: isDone ? 'var(--accent-green)' : 'var(--text-dim)',
                    cursor: 'pointer',
                    marginTop: '0.2rem'
                  }}
                >
                  {isDone ? <CheckSquare size={24} /> : <Square size={24} />}
                </button>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                    <span style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      padding: '0.15rem 0.55rem',
                      borderRadius: 'var(--radius-full)',
                      background: isDone ? 'var(--accent-green)' : 'var(--primary)',
                      color: '#000'
                    }}>
                      Step {s.step}
                    </span>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, textDecoration: isDone ? 'line-through' : 'none' }}>
                      {s.title}
                    </h3>
                  </div>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '0.75rem' }}>
                    {s.description}
                  </p>

                  {s.command && (
                    <div className="code-block">
                      <button 
                        className="code-copy-btn"
                        onClick={() => copyCode(s.command, `step-${s.step}`)}
                      >
                        {copiedId === `step-${s.step}` ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedId === `step-${s.step}` ? 'Copied' : 'Copy Commands'}</span>
                      </button>
                      {s.command}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Helpful Links */}
      <div className="grid-2">
        <div className="glass-card">
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
            <Github size={18} />
            GitHub Repository Setup
          </h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Need to create a new GitHub repository? Go to GitHub dashboard and create a public or private repo.
          </p>
          <a 
            href="https://github.com/new" 
            target="_blank" 
            rel="noreferrer"
            className="btn btn-outline"
            style={{ textDecoration: 'none', display: 'inline-flex' }}
          >
            <span>Create GitHub Repo</span>
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="glass-card">
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', color: 'var(--accent-green)', marginBottom: '0.5rem' }}>
            <Rocket size={18} />
            Netlify App Dashboard
          </h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Connect Netlify to your GitHub account for continuous delivery deployment on every push.
          </p>
          <a 
            href="https://app.netlify.com" 
            target="_blank" 
            rel="noreferrer"
            className="btn btn-primary"
            style={{ textDecoration: 'none', display: 'inline-flex' }}
          >
            <span>Open Netlify App</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
