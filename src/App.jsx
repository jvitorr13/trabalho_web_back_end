// filepath: c:\Users\JOÃO VITOR\OneDrive\Documentos\reactmoreto\teste\src\App.jsx
import React, { useState } from 'react';
import Agenda from "./components/Agenda";
import Contatos from "./components/Contatos";
import Sidebar from "./Sidebar";
import "./App.css";

function App() {
  const [activeModule, setActiveModule] = useState('agenda'); // Estado inicial definido como 'agenda'

  const renderModule = () => {
    switch (activeModule) {
      case 'contatos':
        return <Contatos />;
      case 'agenda':
      default:
        return <Agenda />;
    }
  };

  return (
    <div className="app">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      <main className="main-container">
        {renderModule()} {/* Renderiza o módulo com base no estado */}
      </main>
    </div>
  );
}

export default App;