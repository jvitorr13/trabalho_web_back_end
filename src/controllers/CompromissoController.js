import Compromisso from "../models/CompromissoModel.js";
import Contact from "../models/ContactModel.js";

export const createCompromisso = async (req, res) => {
  try {
    const { titulo, contato_id, data, hora, duracao, descricao } = req.body;

    if (!titulo || !contato_id || !data || !hora || !duracao) {
      return res.status(400).json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
    }

    const compromisso = await Compromisso.create({
      titulo,
      contato_id,
      data,
      hora,
      duracao,
      descricao,
    });

    res.status(201).json(compromisso);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar compromisso", details: error });
  }
};

export const updateCompromisso = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, contato_id, data, hora, duracao, descricao } = req.body;

    const compromisso = await Compromisso.findByPk(id);

    if (!compromisso) {
      return res.status(404).json({ error: "Compromisso não encontrado." });
    }

    compromisso.titulo = titulo || compromisso.titulo;
    compromisso.contato_id = contato_id || compromisso.contato_id;
    compromisso.data = data || compromisso.data;
    compromisso.hora = hora || compromisso.hora;
    compromisso.duracao = duracao || compromisso.duracao;
    compromisso.descricao = descricao || compromisso.descricao;

    await compromisso.save();

    res.status(200).json(compromisso);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar compromisso", details: error });
  }
};

export const getCompromissoById = async (req, res) => {
  try {
    const { id } = req.params;

    const compromisso = await Compromisso.findByPk(id, {
      include: { model: Contact, as: "contacts" }
    });

    if (!compromisso) {
      return res.status(404).json({ error: "Compromisso não encontrado." });
    }

    res.status(200).json(compromisso);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar compromisso", details: error });
  }
};

export const getCompromissos = async (req, res) => {
  try {
    const compromissos = await Compromisso.findAll({
      include: { model: Contact, as: "contato" }
    });
    res.status(200).json(compromissos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar compromissos", details: error });
  }
};

export const deleteCompromisso = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Compromisso.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: "Compromisso não encontrado." });
    }
    res.status(200).json({ message: "Compromisso deletado com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar compromisso", details: error });
  }
};