import React, { useState, useEffect } from 'react';
import { compromissosService } from '../services/api';
import NovoCompromissoModal from './NovoCompromissoModal';
import './Agenda.css';

export default function Agenda() {
  const [compromissos, setCompromissos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModule, setActiveModule] = useState('agenda');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

 const criarCompromisso = async (novoCompromisso) => {
    try {
      setLoading(true);
      const compromissoCriado = await compromissosService.criar(novoCompromisso);
      setCompromissos([...compromissos, compromissoCriado]);
      setError(null);
    } catch (err) {
      setError('Erro ao criar compromisso');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

    const buscarCompromissos = async () => {
    try {
      setLoading(true);
      const data = await compromissosService.listar();
      setCompromissos(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar compromissos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    buscarCompromissos();
  }, []);

  const atualizarCompromisso = async (id, dadosAtualizados) => {
    try {
      setLoading(true);
      const compromissoAtualizado = await compromissosService.atualizar(id, dadosAtualizados);
      setCompromissos(compromissos.map(comp => 
        comp.id === id ? compromissoAtualizado : comp
      ));
      setError(null);
    } catch (err) {
      setError('Erro ao atualizar compromisso');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deletarCompromisso = async (id) => {
    try {
      setLoading(true);
      await compromissosService.deletar(id);
      setCompromissos(compromissos.filter(comp => comp.id !== id));
      setError(null);
    } catch (err) {
      setError('Erro ao deletar compromisso');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

const getCorPorTitulo = (titulo) => {
  if (!titulo) return '#4338CA';
  const tituloLower = titulo.toLowerCase();
  if (tituloLower.includes('reunião')) return '#3B82F6';
  if (tituloLower.includes('almoço')) return '#10B981';
  if (tituloLower.includes('consulta')) return '#8B5CF6';
  if (tituloLower.includes('apresentação')) return '#F59E0B';
  return '#4338CA';
};

const compromissosFiltrados = compromissos.filter((comp) =>
  comp.titulo.toLowerCase().includes(searchTerm.toLowerCase())
);




  return (
    <div className="agenda-container">
      <aside className="sidebar">
        <div className="sidebar-modules">
          <button 
            className={`module-btn ${activeModule === 'lock' ? 'active' : ''}`}
            onClick={() => setActiveModule('lock')}
          >
            🔒
          </button>
          <button 
            className={`module-btn ${activeModule === 'users' ? 'active' : ''}`}
            onClick={() => setActiveModule('users')}
          >
            👥
          </button>
          <button 
            className={`module-btn ${activeModule === 'agenda' ? 'active' : ''}`}
            onClick={() => setActiveModule('agenda')}
          >
            📅
          </button>
        </div>
      </aside>

      <main className="main-content">
        <div className="header">
          <h1>Agenda de Compromissos</h1>
          <button 
            className="novo-btn"
            onClick={() => setShowModal(true)}
          >
            + Novo Compromisso
          </button>
        </div>

        {showModal && (
          <NovoCompromissoModal
            onClose={() => setShowModal(false)}
            onSave={(novoCompromisso) => {
              criarCompromisso(novoCompromisso);
              setShowModal(false);
            }}
          />
        )}

        {error && <div className="error-message">{error}</div>}

        <div className="compromissos-section">
          <div className="section-header">
            <h2>Compromissos de Hoje</h2>
            <input
              type="text"
              placeholder="Buscar compromissos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="compromissos-list">
            {loading ? (
              <div className="loading">Carregando...</div>
            ) : compromissosFiltrados.length === 0 ? (
              <div className="no-results">Nenhum compromisso encontrado</div>
            ) : (
              compromissosFiltrados.map((compromisso) => (
                <div 
                  key={compromisso.id} 
                  className="compromisso-card"
                  style={{ borderLeft: `4px solid ${getCorPorTitulo(compromisso.titulo)}` }}
                >
                  <div className="card-header">
                    <h3>{compromisso.titulo}</h3>
                    <div className="card-actions">
                      <button 
                        className="edit-btn"
                        onClick={() => {
                          atualizarCompromisso(compromisso.id, {
                            ...compromisso,
                            titulo: `${compromisso.titulo} (Editado)`
                          });
                        }}
                      >
                        ✏️
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => deletarCompromisso(compromisso.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <div className="card-info">
                    <span>🕒 {compromisso.horario}</span>
                    <span>📅 {compromisso.data}</span>
                  </div>
                  <p className="card-description">{compromisso.descricao}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}