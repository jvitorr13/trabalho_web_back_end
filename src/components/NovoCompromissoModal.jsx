import React, { useState, useEffect } from 'react';
import './Modal.css';

export default function NovoCompromissoModal({ onClose, onSave, compromissoParaEditar, contatos }) {
  const [formData, setFormData] = useState({
    titulo: '',
    contato_id: '',
    data: '',
    hora: '',
    duracao: 60,
    descricao: ''
  });

  useEffect(() => {
    if (compromissoParaEditar) {
      setFormData({
        titulo: compromissoParaEditar.titulo || '',
        contato_id: compromissoParaEditar.contato_id || '',
        data: compromissoParaEditar.data || '',
        hora: compromissoParaEditar.hora || '',
        duracao: compromissoParaEditar.duracao || 60,
        descricao: compromissoParaEditar.descricao || ''
      });
    } else {
      setFormData({
        titulo: '',
        contato_id: '',
        data: '',
        hora: '',
        duracao: 60,
        descricao: ''
      });
    }
  }, [compromissoParaEditar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{compromissoParaEditar ? 'Editar Compromisso' : 'Novo Compromisso'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título *</label>
            <input
              type="text"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Contato *</label>
            <select
              value={formData.contato_id}
              onChange={(e) => setFormData({ ...formData, contato_id: e.target.value })}
              required
            >
              <option value="">Selecione um contato</option>
              {contatos && contatos.length > 0 ? (
                contatos.map((contato) => (
                  <option key={contato.id} value={contato.id}>
                    {contato.nome} {contato.sobrenome}
                  </option>
                ))
              ) : (
                <option disabled>Nenhum contato disponível</option>
              )}
            </select>
          </div>

          <div className="form-group">
            <label>Data *</label>
            <input
              type="date"
              value={formData.data}
              onChange={(e) => setFormData({ ...formData, data: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Hora *</label>
            <input
              type="time"
              value={formData.hora}
              onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Duração (minutos)</label>
            <select
              value={formData.duracao}
              onChange={(e) => setFormData({ ...formData, duracao: parseInt(e.target.value, 10) })}
            >
              <option value={30}>30 minutos</option>
              <option value={60}>1 hora</option>
              <option value={90}>1 hora e 30 minutos</option>
              <option value={120}>2 horas</option>
            </select>
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <textarea
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              rows={4}
            />
          </div>

          <div className="modal-buttons">
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
