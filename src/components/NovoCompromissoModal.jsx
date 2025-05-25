import React, { useState } from 'react';
import './Modal.css';

export default function NovoCompromissoModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    titulo: '',
    contato_id: 2,
    data: '',
    hora: '',
    duracao: 60,
    descricao: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Novo Compromisso</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título *</label>
            <input
              type="text"
              value={formData.titulo}
              onChange={(e) => setFormData({...formData, titulo: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Data *</label>
            <input
              type="date"
              value={formData.data}
              onChange={(e) => setFormData({...formData, data: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Hora *</label>
            <input
              type="time"
              value={formData.hora}
              onChange={(e) => setFormData({...formData, hora: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Duração (minutos)</label>
            <select
              value={formData.duracao}
              onChange={(e) => setFormData({...formData, duracao: e.target.value})}
            >
              <option value="30">30 minutos</option>
              <option value="60">1 hora</option>
              <option value="90">1 hora e 30 minutos</option>
              <option value="120">2 horas</option>
            </select>
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <textarea
              value={formData.descricao}
              onChange={(e) => setFormData({...formData, descricao: e.target.value})}
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