import express from "express";
import ContactRoute from "./ContactRoute.js";
import CompromissoRoute from "./CompromissoRoute.js";

const router = express.Router();

router.use("/contacts", ContactRoute);
router.use("/compromissos", CompromissoRoute);

export default (app) => {
  app.use("/api", router);
};