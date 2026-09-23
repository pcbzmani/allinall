import React from 'react';
import { Search, Terminal, HelpCircle, Sun, Moon, Rocket, Laptop } from 'lucide-react';

export function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  theme, 
  toggleTheme, 
  openTerminal, 
  openQuiz,
  activeSection,
  setActiveSection
}) {
  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => setActiveSection('networking')}>
        <div className="nav-brand-icon">
          <Laptop size={22} />
        </div>
        <span>DevTech Compass</span>
      </div>

      <div className="search-box">
        <Search className="search-icon" size={16} />
        <input 
          type="text" 
          className="search-input"
          placeholder="Search tools (nslookup, curl, git, python, gcp, RAG)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="nav-actions">
        <button className="btn btn-outline" onClick={openTerminal} title="Interactive Terminal Simulator">
          <Terminal size={16} />
          <span>CLI Terminal</span>
        </button>

        <button className="btn btn-outline" onClick={openQuiz} title="Knowledge Quiz">
          <HelpCircle size={16} />
          <span>Quiz</span>
        </button>

        <button 
          className={`btn ${activeSection === 'deployment-guide' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveSection('deployment-guide')}
        >
          <Rocket size={16} />
          <span>GitHub & Netlify</span>
        </button>

        <button className="btn-icon" onClick={toggleTheme} title="Toggle Theme">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
}
