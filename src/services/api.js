import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333/api'
});

export const compromissosService = {
  listar: async () => {
    const response = await api.get('/compromissos');
    return response.data;
  },

  criar: async (compromisso) => {
    const response = await api.post('/compromissos', compromisso);
    return response.data;
  },

  atualizar: async (id, compromisso) => {
    const response = await api.put(`/compromissos/${id}`, compromisso);
    return response.data;
  },

  deletar: async (id) => {
    await api.delete(`/compromissos/${id}`);
  }
};