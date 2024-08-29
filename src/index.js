import express, { json } from 'express';
import { routes } from './routes/routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';


// obtem o caminho completo do arquivo atual
const __filename = fileURLToPath(import.meta.url);

//obtem o diretorio onde o arquivo atual esta localizado
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true }));

app.use(json());

//requisicoes de diferentes origens
app.use(cors());


app.set('view engine', 'ejs');

//define o diretorio onde as views estao
app.set('views', path.join(__dirname, 'views'));

app.use('/api', routes);

//  app.use((err, req, res, next) => {
//      console.error(err.stack);
//      res.status(500).send('Algo deu errado!');
//  });

app.use((request, response) => {
    response.status(404).send('Rota não encontrada');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
