import express, { json } from 'express';
import { routes } from './src/routes/routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

import * as dotnv from 'dotenv';
import  cors  from 'cors'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const app = express();
const PORT = 3000;

app.use(json());
app.use(cors());

app.use('/api', routes);

app.use((request, response) => {
    response.status(404).send('Rota não encontrada');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});