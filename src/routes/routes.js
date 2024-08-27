import { Router } from 'express';
import { UserRoute } from './userRoute.js'; 
import { MatriculaRoute } from './matriculaRoute.js'
import { CobrancaRoute } from './cobrancaRoute.js'
import { DisciplinaRoute } from './disciplinaRoute.js'
import { CursoRoute } from './cursoRoute.js';


const routes = Router();

routes.use('/matricula', MatriculaRoute);
routes.use('/usuario', UserRoute);
routes.use('/financeiro', CobrancaRoute);
routes.use('/disciplina', DisciplinaRoute);
routes.use('./curriculo', CursoRoute);



// routes.get('/curriculo', (req, res) => {
//   res.render('aluno/curriculo', { title: 'Currículos' });
// });

// routes.get('/matricula', (req, res) => {
//   res.render('aluno/matricula', { title: 'Se matricule' });
// });

// routes.get('/financeiro', (req, res) => {
//   res.render('aluno/financeiro', { title: 'Financeiro' });
// });

// routes.get('/perfil', (req, res) => {
//   res.render('aluno/perfil', { title: 'Meu perfil' });
// });

// routes.get('/disciplinas', (req, res) => {
//   res.render('professor/disciplinas', { title: 'Disciplinas' });
// });

routes.use('/users', UserRoute); 

export { routes };
