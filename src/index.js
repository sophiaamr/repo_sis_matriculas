import express, { json } from 'express';
import { routes } from './routes/routes.js'; // Importa as rotas principais (talvez você tenha outras rotas aqui)
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { DisciplinaRoute } from './routes/disciplinaRoute.js';

// Certifique-se de que o arquivo de rotas está sendo importado corretamente



// Obtém o caminho completo do arquivo atual
const __filename = fileURLToPath(import.meta.url);

// Obtém o diretório onde o arquivo atual está localizado
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Analisa o corpo das requisições em formato JSON
app.use(json());

// Requisições de diferentes origens
app.use(cors());

// Define o motor de visualização
app.set('view engine', 'ejs');

// Define o diretório onde as views estão
app.set('views', path.join(__dirname, 'views'));

// Configura as rotas principais
app.use('/api', routes);


app.use((request, response) => {
    response.status(404).send('Rota não encontrada');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

  
app.use('/api/disciplinas', DisciplinaRoute);
