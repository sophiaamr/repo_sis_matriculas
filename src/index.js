import express, { json } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { routes } from './routes/routes.js';
import { DisciplinaRoute } from './routes/disciplinaRoute.js';
import { OutrosRoute } from './routes/OutrosRoute.js'; // Corrigido para importação nomeada
import { AlunoRoute } from './routes/alunoRoute.js'; // Corrigido para usar a rota de alunos


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(json());
app.use(cors());

app.use(express.json());
app.use('/api/aluno', AlunoRoute);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Usar as rotas
app.use('/api', routes);
app.use('/api/disciplinas', DisciplinaRoute);
app.use('/api/outros', OutrosRoute); // Ajustado para minúsculas, conforme o padrão

app.use((request, response) => {
    response.status(404).send('Rota não encontrada');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
