import React, { useState } from 'react';
import './Sidebar.css';

export default function Sidebar({ activeModule, setActiveModule }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={`sidebar ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="sidebar-icons">
        <div
          className={`icon-wrapper ${activeModule === 'agenda' ? 'active' : ''}`}
          onClick={() => setActiveModule('agenda')} // Navega para o módulo Agenda
        >
          <span className="icon">📅</span>
          {isExpanded && <span className="icon-text">Agenda</span>}
        </div>
        <div
          className={`icon-wrapper ${activeModule === 'contatos' ? 'active' : ''}`}
          onClick={() => setActiveModule('contatos')} // Navega para o módulo Contatos
        >
          <span className="icon">👥</span>
          {isExpanded && <span className="icon-text">Contatos</span>}
        </div>
      </div>
    </aside>
  );
}