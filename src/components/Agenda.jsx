import React, { useState, useEffect } from 'react';
import { compromissosService, contatoService } from '../services/api';
import NovoCompromissoModal from './NovoCompromissoModal';
import './Agenda.css';

export default function Agenda() {
  const [compromissos, setCompromissos] = useState([]);
  const [contatos, setContatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [compromissoParaEditar, setCompromissoParaEditar] = useState(null);

  const buscarCompromissos = async () => {
    try {
      setLoading(true);
      const data = await compromissosService.listar();
      setCompromissos(data);
    } catch (err) {
      setError('Erro ao carregar compromissos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const buscarContatos = async () => {
    try {
      const resposta = await contatoService.listar();
      setContatos(resposta.data);
    } catch (err) {
      setError('Erro ao carregar contatos');
      console.error(err);
    }
  };

  useEffect(() => {
    const carregarDados = async () => {
      await buscarContatos();
      await buscarCompromissos();
    };
    carregarDados();
  }, []);

  const handleSalvarCompromisso = async (dadosCompromisso) => {
    try {
      setLoading(true);
      if (compromissoParaEditar) {
        const compromissoAtualizado = await compromissosService.atualizar(
          compromissoParaEditar.id,
          dadosCompromisso
        );
        setCompromissos(compromissos.map(comp =>
          comp.id === compromissoParaEditar.id ? compromissoAtualizado : comp
        ));
      } else {
        const compromissoCriado = await compromissosService.criar(dadosCompromisso);
        setCompromissos([...compromissos, compromissoCriado]);
      }
      setShowModal(false);
      setCompromissoParaEditar(null);
    } catch (err) {
      setError('Erro ao salvar compromisso');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditarCompromisso = (compromisso) => {
    setCompromissoParaEditar(compromisso);
    setShowModal(true);
  };

  const handleFecharModal = () => {
    setShowModal(false);
    setCompromissoParaEditar(null);
  };

  const deletarCompromisso = async (id) => {
    try {
      setLoading(true);
      await compromissosService.deletar(id);
      setCompromissos(compromissos.filter(comp => comp.id !== id));
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

  const abrirModal = () => {
    if (contatos.length === 0) {
      alert('Contatos ainda estão carregando, aguarde...');
      return;
    }
    setCompromissoParaEditar(null);
    setShowModal(true);
  };

  return (
    <div className="agenda-container">
      <main className="main-content">
        <div className="header">
          <h1>Agenda de Compromissos</h1>
          <button
            className="novo-btn"
            onClick={abrirModal}
            disabled={loading || contatos.length === 0}
          >
            + Novo Compromisso
          </button>
        </div>

        {showModal && (
          <NovoCompromissoModal
            key={compromissoParaEditar ? compromissoParaEditar.id : 'novo'}
            onClose={handleFecharModal}
            onSave={handleSalvarCompromisso}
            compromissoParaEditar={compromissoParaEditar}
            contatos={contatos}
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
              compromissosFiltrados.map((compromisso) => {
                const contato = compromisso.contacts; 
                return (
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
                          onClick={() => handleEditarCompromisso(compromisso)}
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
                      <span>🕒 {compromisso.hora}</span>
                      <span>📅 {compromisso.data}</span>
                      {contato && (
                        <>
                          <span>👤</span>
                          <span>{contato.nome} {contato.sobrenome}</span>
                        </>
                      )}
                    </div>
                    <p className="card-description">{compromisso.descricao}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
