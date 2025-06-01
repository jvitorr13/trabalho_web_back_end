import React, { useState, useEffect } from 'react';

export default function NovoContatoModal({ onClose, onSave, contatoParaEditar }) {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState(''); // novo campo
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');

  useEffect(() => {
    if (contatoParaEditar) {
      setNome(contatoParaEditar.nome || '');
      setSobrenome(contatoParaEditar.sobrenome || '');
      setEmail(contatoParaEditar.email || '');
      setTelefone(contatoParaEditar.telefone || '');
      setEndereco(contatoParaEditar.endereco || '');
    }
  }, [contatoParaEditar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ nome, sobrenome, email, telefone, endereco });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{contatoParaEditar ? 'Editar Contato' : 'Novo Contato'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Sobrenome</label>
            <input
              type="text"
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Telefone</label>
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Endereço</label>
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}