import React, { useState, useEffect } from 'react';
import './Modal.css';

export default function NovoContatoModal({ onClose, onSave, contatoParaEditarParaEditar }) {
    const [formData, setFormData] = useState({
        nome: '',
        sobrenome: '',
        email: '',
        telefone: '',
        observacao: '   ',
        categoria: ''
    });
    useEffect(() => {
        if (contatosParaEditar) {
            setFormData({
                nome: contatosParaEditar.nome || '',
                sobrenome: contatoParaEditar.sobrenome || '',
                email: contatoParaEditar.email || '',
                telefone: contatoParaEditar.telefone || '',
                observacao: contatoParaEditar.observacao || '',
                categoria: contatoParaEditar.categoria || ''
            });
        }
    }, [contatosParaEditar]);

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
                    <h2>{contatoParaEditar ? 'Editar Contato' : 'Novo Contato'}</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nome *</label>
                        <input
                            type="name"
                            value={formData.nome}
                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                            required
                        />
                    </div>

                     <div className="form-group">
                        <label>Sobrenome *</label>
                        <input
                            type="surname"
                            value={formData.sobrenome}
                            onChange={(e) => setFormData({ ...formData, sobrenome: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email *</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Telefone *</label>
                        <input
                            type="phone"
                            value={formData.telefone}
                            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Observação</label>
                        <textarea
                            value={formData.observacao}
                            onChange={(e) => setFormData({ ...formData, observacao: e.target.value })}
                            rows={4}
                        />
                    </div>

                    <div className="form-group">
                        <label>Categoria</label>
                        <textarea
                            value={formData.categoria}
                            onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
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

