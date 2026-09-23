import React, { useState } from 'react';
import { Terminal as TerminalIcon, X, Play, RefreshCw } from 'lucide-react';

export function TerminalSimulator({ isOpen, onClose }) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'DevTech Compass Interactive CLI Terminal Simulator v1.0' },
    { type: 'system', text: 'Type a command (e.g., nslookup google.com, curl -I https://api.github.com, net group /domain, git status, python) or click quick sample buttons below.\n' }
  ]);

  if (!isOpen) return null;

  const runSimulatedCommand = (cmdStr) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const newHistory = [...history, { type: 'input', text: `$ ${trimmed}` }];
    const cmdLower = trimmed.toLowerCase();

    let outputText = '';

    if (cmdLower.startsWith('nslookup')) {
      const arg = trimmed.split(' ')[1] || 'google.com';
      outputText = `Server:  UnKnown
Address:  192.168.1.1

Non-authoritative answer:
Name:    ${arg}
Addresses:  2607:f8b0:4004:839::200e
          142.250.190.46
          
[Outcome]: Successfully resolved DNS records for ${arg}.`;
    } else if (cmdLower.startsWith('curl')) {
      outputText = `HTTP/2 200
server: GitHub.com
date: Wed, 23 Sep 2026 19:25:00 GMT
content-type: application/json; charset=utf-8
cache-control: public, max-age=60
x-ratelimit-limit: 60
x-ratelimit-remaining: 59

{"message":"Welcome to GitHub REST API v3"}`;
    } else if (cmdLower.startsWith('telnet')) {
      outputText = `Trying 192.168.1.50...
Connected to db.internal-network.com (port 5432).
Escape character is '^]'.
[Outcome]: Port 5432 is OPEN and reachable through security firewall rules.`;
    } else if (cmdLower.includes('net group') || cmdLower.includes('domain')) {
      outputText = `Group name     Domain Admins
Comment        Designated administrators of the Active Directory domain

Members:
-------------------------------------------------------------------------------
Administrator            sec_audit_admin          srv_backup_acc
The command completed successfully.`;
    } else if (cmdLower.startsWith('git status')) {
      outputText = `On branch main
Your branch is up to date with 'origin/main'.

Changes staged for commit:
  (use "git restore --staged <file>..." to unstage)
        modified:   src/App.jsx
        modified:   netlify.toml

Untracked files:
        src/components/TerminalSimulator.jsx`;
    } else if (cmdLower.startsWith('git')) {
      outputText = `[Git Version 2.44.0]
Executed command: ${trimmed}
Repository status: Clean working tree on branch main.`;
    } else if (cmdLower.startsWith('python')) {
      outputText = `Python 3.11.8 (main, Feb 12 2026, 14:22:00) [MSC v.1929 64 bit (AMD64)]
>>> import math
>>> math.sqrt(144)
12.0
>>> print("Hello from DevTech Compass Python Environment!")`;
    } else if (cmdLower.startsWith('gcloud')) {
      outputText = `NAME            ZONE           MACHINE_TYPE  PREEMPTIBLE  INTERNAL_IP  EXTERNAL_IP    STATUS
dev-web-vm-1    us-central1-a  e2-medium                  10.128.0.2   34.122.45.89   RUNNING
prod-db-vm-2    us-central1-b  n2-standard-4              10.128.0.5   35.200.12.11   RUNNING`;
    } else if (cmdLower === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    } else {
      outputText = `bash: command not found: ${trimmed}. Try typing: nslookup google.com, curl -I https://api.github.com, net group /domain, or git status.`;
    }

    newHistory.push({ type: 'output', text: outputText });
    setHistory(newHistory);
    setInputVal('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runSimulatedCommand(inputVal);
  };

  const presetCmds = [
    'nslookup google.com',
    'curl -I https://api.github.com',
    'telnet 192.168.1.50 5432',
    'net group "Domain Admins" /domain',
    'git status',
    'python --version',
    'gcloud compute instances list'
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 1100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '850px',
        background: '#070a12',
        border: '1px solid var(--border-color-glow)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
      }}>
        {/* Terminal Top Bar */}
        <div className="terminal-topbar">
          <div className="terminal-dots">
            <span className="dot dot-red" onClick={onClose} style={{ cursor: 'pointer' }}></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>
          <div className="terminal-title">
            <TerminalIcon size={14} style={{ display: 'inline', marginRight: '6px' }} />
            CLI Terminal Simulator - Interactive Sandbox
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {/* Preset Quick Buttons */}
        <div style={{ padding: '0.75rem 1rem', background: '#0d111c', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', marginRight: '0.5rem' }}>Presets:</span>
          {presetCmds.map((preset, idx) => (
            <button 
              key={idx}
              onClick={() => runSimulatedCommand(preset)}
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                color: 'var(--primary)',
                cursor: 'pointer'
              }}
            >
              {preset}
            </button>
          ))}
        </div>

        {/* Terminal Output Buffer */}
        <div className="terminal-body" style={{ height: '380px', overflowY: 'auto' }}>
          {history.map((h, idx) => (
            <div key={idx} style={{ marginBottom: '0.6rem', whiteSpace: 'pre-wrap' }}>
              {h.type === 'input' && <span className="terminal-prompt">{h.text}</span>}
              {h.type === 'system' && <span style={{ color: 'var(--text-dim)' }}>{h.text}</span>}
              {h.type === 'output' && <span style={{ color: '#34d399' }}>{h.text}</span>}
            </div>
          ))}

          <form onSubmit={handleSubmit} className="terminal-input-line">
            <span className="terminal-prompt">$</span>
            <input 
              type="text"
              className="terminal-input"
              placeholder="Type command here (or 'clear')..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              autoFocus
            />
          </form>
        </div>
      </div>
    </div>
  );
}
