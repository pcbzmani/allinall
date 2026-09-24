import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { TopicView } from './components/TopicView';
import { TerminalSimulator } from './components/TerminalSimulator';
import { QuizSection } from './components/QuizSection';
import { DeploymentGuideView } from './components/DeploymentGuideView';
import { Background3D } from './components/Background3D';

import { networkingData } from './data/networkingData';
import { gitData } from './data/gitData';
import { cicdData } from './data/cicdData';
import { aiData } from './data/aiData';
import { pythonData } from './data/pythonData';
import { databaseData } from './data/databaseData';
import { gcpData } from './data/gcpData';
import { Check } from 'lucide-react';

export function App() {
  const [activeSection, setActiveSection] = useState('networking');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState('dark');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const allSections = {
    networking: networkingData,
    git: gitData,
    cicd: cicdData,
    ai: aiData,
    python: pythonData,
    database: databaseData,
    gcp: gcpData
  };

  const getFilteredData = () => {
    const currentData = allSections[activeSection];
    if (!searchQuery.trim() || !currentData) return currentData;

    const q = searchQuery.toLowerCase();
    const filteredItems = currentData.items.filter(item => 
      item.name.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.why.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.syntax.toLowerCase().includes(q)
    );

    return {
      ...currentData,
      title: `Search Results for "${searchQuery}"`,
      subtitle: `Found ${filteredItems.length} matching modules in ${currentData.title}`,
      items: filteredItems
    };
  };

  return (
    <>
      {/* 3D Animated Background */}
      {theme === 'dark' && <Background3D />}

      <div className="app-container">
        <Navbar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          theme={theme}
          toggleTheme={toggleTheme}
          openTerminal={() => setIsTerminalOpen(true)}
          openQuiz={() => setIsQuizOpen(true)}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        <div className="main-layout">
          <Sidebar 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />

          <main className="content-area">
            {activeSection === 'deployment-guide' ? (
              <DeploymentGuideView showToast={showToast} />
            ) : (
              <TopicView 
                sectionData={getFilteredData()} 
                showToast={showToast}
              />
            )}
          </main>
        </div>

        <footer className="footer">
          <div>
            <strong>DevTech Compass</strong> — Master Computer Science, CLI Tools, DevOps & Cloud Fundamentals.
          </div>
          <div style={{ marginTop: '0.4rem', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
            3D Interactive Developer Knowledge Platform • Hosted on GitHub & Netlify
          </div>
        </footer>

        <TerminalSimulator 
          isOpen={isTerminalOpen} 
          onClose={() => setIsTerminalOpen(false)} 
        />

        <QuizSection 
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
        />

        {toastMessage && (
          <div className="toast">
            <Check size={18} color="var(--accent-green)" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
