import React from 'react';
import { Network, GitBranch, Cpu, Bot, Code2, Database, Cloud, Rocket } from 'lucide-react';

export function Sidebar({ activeSection, setActiveSection }) {
  const menuItems = [
    { id: 'networking', label: 'Networking & CLI', icon: Network, count: 6 },
    { id: 'git', label: 'Git Cheat Sheet', icon: GitBranch, count: 6 },
    { id: 'cicd', label: 'CI/CD Pipelines', icon: Cpu, count: 3 },
    { id: 'ai', label: 'AI & ML Basics', icon: Bot, count: 3 },
    { id: 'python', label: 'Python Essentials', icon: Code2, count: 3 },
    { id: 'database', label: 'Databases (SQL/NoSQL)', icon: Database, count: 2 },
    { id: 'gcp', label: 'GCP Cloud Basics', icon: Cloud, count: 2 },
    { id: 'deployment-guide', label: 'GitHub & Netlify Guide', icon: Rocket, count: 'Guide' }
  ];

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-title">Core Knowledge Areas</div>
        <ul className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <li 
                key={item.id}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveSection(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                <span className="sidebar-item-count">{item.count}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
