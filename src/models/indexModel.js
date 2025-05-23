import Contact from "./ContactModel.js";
import Compromisso from "./CompromissoModel.js";

(async () => {
  try {
    await Contact.sync({ alter: true });
    await Compromisso.sync({ alter: true }); 
    console.log("Tabelas sincronizadas com sucesso!");
  } catch (error) {
    console.error("Erro ao sincronizar tabelas:", error);
  }
})();