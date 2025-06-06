import React, { useEffect, useState } from 'react';
import { contatoService } from '../services/api';
import NovoContatoModal from './NovoContatoModal';
import './Contatos.css';

export default function Contatos() {
  const [contatos, setContatos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [contatoParaEditar, setContatoParaEditar] = useState(null);

const buscarContatos = async () => {
  try {
    setLoading(true);
    const response = await contatoService.listar();
    console.log('Resposta da API:', response); 

    const data = response.data || response;
    console.log('Dados extraídos:', data); 

    const contatosArray = Array.isArray(data) ? data : [];
    console.log('Array de contatos:', contatosArray);

    setContatos(contatosArray);
    setError(null);
  } catch (err) {
    console.error('Erro ao carregar contatos:', err);
    setError('Erro ao carregar contatos');
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    buscarContatos();
  }, []);

const handleSalvarContato = async (dadosContato) => {
  try {
    setLoading(true);
    if (contatoParaEditar) {
      const response = await contatoService.atualizar(contatoParaEditar.id, dadosContato);
      const contatoAtualizado = response.data || response;
      setContatos(prevContatos =>
        prevContatos.map(cont => cont.id === contatoParaEditar.id ? contatoAtualizado : cont)
      );
    } else {
      const response = await contatoService.criar(dadosContato);
      const contatoCriado = response.data || response;
      console.log('Contato criado:', contatoCriado);
      setContatos(prevContatos => [...prevContatos, contatoCriado]);
    }
    setError(null);
    setShowModal(false);
    setContatoParaEditar(null);
    await buscarContatos();
  } catch (err) {
    console.error('Erro ao salvar contato:', err);
    setError(contatoParaEditar ? 'Erro ao atualizar contato' : 'Erro ao criar contato');
  } finally {
    setLoading(false);
  }
};
  const handleEditarContato = (contato) => {
    setContatoParaEditar(contato);
    setShowModal(true);
  };

  const handleFecharModal = () => {
    setShowModal(false);
    setContatoParaEditar(null);
  };

  const deletarContato = async (id) => {
    try {
      setLoading(true);
      await contatoService.deletar(id);
      setContatos(prevContatos => prevContatos.filter(cont => cont.id !== id));
      setError(null);
    } catch (err) {
      console.error('Erro ao deletar contato:', err);
      setError('Erro ao deletar contato');
    } finally {
      setLoading(false);
    }
  };

const contatosFiltrados = Array.isArray(contatos)
  ? contatos.filter((cont) => {
      const nome = cont?.nome ?? '';
      const email = cont?.email ?? '';
      return nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
             email.toLowerCase().includes(searchTerm.toLowerCase());
    })
  : [];

  return (
    <div className="contatos-container">
      <main className="main-content">
        <div className="header">
          <h1>Gestão de Contatos</h1>
          <button className="novo-btn" onClick={() => setShowModal(true)}>
            + Novo Contato
          </button>
        </div>

        {showModal && (
          <NovoContatoModal
            onClose={handleFecharModal}
            onSave={handleSalvarContato}
            contatoParaEditar={contatoParaEditar}
          />
        )}

        {error && <div className="error-message">{error}</div>}

        <div className="contatos-section">
          <div className="section-header">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Buscar contatos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="contatos-table">
            <div className="table-header">
              <div className="col-nome">NOME</div>
              <div className="col-email">E-MAIL</div>
              <div className="col-telefone">TELEFONE</div>
              <div className="col-endereco">ENDEREÇO</div>
              <div className="col-acoes">AÇÕES</div>
            </div>
            <div className="table-body">
              {loading ? (
                <div className="loading">Carregando...</div>
              ) : contatosFiltrados.length === 0 ? (
                <div className="no-results">Nenhum contato encontrado</div>
              ) : (
                contatosFiltrados.map((contato) => (
                  <div key={contato.id} className="table-row">
                    <div className="col-nome">
                      <div className="avatar">
                        {(contato.nome && contato.nome.length > 0) ? contato.nome[0].toUpperCase() : '?'}
                      </div>
                      <span>{contato.nome} {contato.sobrenome}</span>
                    </div>
                    <div className="col-email">{contato.email}</div>
                    <div className="col-telefone">{contato.telefone}</div>
                    <div className="col-endereco">{contato.endereco}</div>
                    <div className="col-acoes">
                      <button className="edit-btn" onClick={() => handleEditarContato(contato)}>
                        ✏️
                      </button>
                      <button className="delete-btn" onClick={() => deletarContato(contato.id)}>
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}