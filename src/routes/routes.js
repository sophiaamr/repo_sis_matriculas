import { Router } from 'express';
import { userRoutes } from './usersRoutes.js'; // Certifique-se de que o caminho está correto

const routes = Router();

routes.get('/', (req, res) => {
  res.render('index', { title: 'Página Principal' });
});

routes.use('/users', userRoutes); // Vincula as rotas de usuário

export { routes };
