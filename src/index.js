import express, { json } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { routes } from './routes/routes.js';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home'); // Renderiza o arquivo views/home.ejs
});

// Usar as rotas
app.use('/api', routes);


app.use((request, response) => {
    response.status(404).send('Rota não encontrada');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
