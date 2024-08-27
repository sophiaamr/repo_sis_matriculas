import { Router } from 'express';
import { userRoutes } from './usersRoutes.js'; 

const routes = Router();

routes.get('/curriculo', (req, res) => {
  res.render('aluno/curriculo', { title: 'Currículos' });
});

routes.get('/matricula', (req, res) => {
  res.render('aluno/matricula', { title: 'Se matricule' });
});

routes.get('/financeiro', (req, res) => {
  res.render('aluno/financeiro', { title: 'Financeiro' });
});

routes.get('/perfil', (req, res) => {
  res.render('aluno/perfil', { title: 'Meu perfil' });
});

routes.use('/users', userRoutes); 

export { routes };
