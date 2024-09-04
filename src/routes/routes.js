import { Router } from 'express';
import { UserRoute } from './userRoute.js'; 
import { MatriculaRoute } from './matriculaRoute.js';
import { CobrancaRoute } from './cobrancaRoute.js';
import { DisciplinaRoute } from './disciplinaRoute.js';
import { CursoRoute } from './cursoRoute.js';
import { AlunoRoute } from './alunoRoute.js';
import { ProfessorRoute } from './professorRoute.js';
import { SecretariaRoute } from './secretariaRoute.js';
import { CurriculoRoute } from './curriculoRoute.js';
import { OutrosRoute } from './OutrosRoute.js';

const routes = Router();

routes.use('/matricula', MatriculaRoute);
routes.use('/usuario', UserRoute);
routes.use('/financeiro', CobrancaRoute);
routes.use('/disciplinas', DisciplinaRoute);
routes.use('/cursos', CursoRoute);
routes.use('/alunos', AlunoRoute);
routes.use('/professores', ProfessorRoute);
routes.use('/secretarias', SecretariaRoute);
routes.use('/curriculo', CurriculoRoute);
routes.use('/login', UserRoute);
routes.use('/outros', OutrosRoute);

export { routes };
