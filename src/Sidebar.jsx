import React, { useState } from 'react';
import './Sidebar.css';

export default function Agenda() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="agenda-container">
      <aside 
        className={`sidebar ${isExpanded ? 'expanded' : ''}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="sidebar-icons">
          <div className="icon-wrapper">
            <span className="icon">🔒</span>
            {isExpanded && <span className="icon-text">Agenda</span>}
          </div>
          <div className="icon-wrapper">
            <span className="icon">👥</span>
            {isExpanded && <span className="icon-text">Usuários</span>}
          </div>
          <div className="icon-wrapper">
            <span className="icon">📅</span>
            {isExpanded && <span className="icon-text">Calendário</span>}
          </div>
        </div>
        <div className="sidebar-bottom">
          <div className="icon-wrapper">
            <span className="icon">◀</span>
          </div>
        </div>
      </aside>
    </div>
  );
}