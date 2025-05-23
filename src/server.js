import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import './models/indexModel.js';
import cors from 'cors';
import fileupload from 'express-fileupload';
import { sequelize } from "./config/config.js";
import "./models/indexModel.js"; 
import { fileURLToPath } from "url";
import routes from './routes/indexRoute.js'; 
import 'dotenv/config';


const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

sequelize.authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });
  
const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '../access.log'),
  { flags: 'a' }
);

const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true)
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true
};

app.use(fileupload({
  createParentPath: true
}));
app.use(cors(corsOptions));
app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/public', express.static('public'))

routes(app);
app.use((req, res) => {
  res.status(404).send('404 - Página não encontrada')
});

app.listen(3333, () => {
  console.log(`API running in 3333`);
});