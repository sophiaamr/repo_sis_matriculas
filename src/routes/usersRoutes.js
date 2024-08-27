import { Router } from 'express';
import { UserController } from '../controllers/userController.js';
import { CobrancaController } from '../controllers/cobrancaController.js';
import { MatriculaController} from '../controllers/matriculaController.js'
import { CursoController } from '../controllers/cursoController.js';
import { DisciplinaController } from '../controllers/disciplinaController.js'

const router = Router();
const cobrancaController = new CobrancaController(); 
const userController = new UserController();
const matriculaController = new MatriculaController();
const cursoController = new CursoController();
const disciplinaController = new DisciplinaController();

// Rotas para Alunos
router.post('/aluno', userController.createAluno);
router.get('/alunos', userController.getAllAlunos);

// Rotas para Professores
router.post('/professor', userController.createProfessor);
router.get('/professores', userController.getAllProfessors);

// Rotas para Secretarias
router.post('/secretaria', userController.createSecretaria);
router.get('/secretarias', userController.getAllSecretaria);

// Rotas gerais para Usuários
router.get('/usuario/:id', userController.getById);
router.delete('/usuario/:id', userController.deleteUser);
router.put('/usuario/:id', userController.updateUserById);

// Rotas para Cobranca
router.post('/cobranca', cobrancaController.create);
router.get('/cobranca', cobrancaController.getAll);
router.get('/cobranca/:id', cobrancaController.getById);
router.put('/cobranca/:id', cobrancaController.update);
router.delete('/cobranca/:id', cobrancaController.delete);


// Rotas para Matricula
router.post('/matricula', matriculaController.create);
router.get('/matricula', matriculaController.getAll);
router.get('/matricula/:id', matriculaController.getById);
router.put('/matricula/:id', matriculaController.update);
router.delete('/matricula/:id', matriculaController.delete);

// Rotas para Curso
router.post('/curso', cursoController.create);
router.get('/curso', cursoController.getAll);
router.get('/curso/:id', cursoController.getById);
router.put('/curso/:id', cursoController.update);
router.delete('/curso/:id', cursoController.delete);


// Rotas para Disciplina
router.post('/disciplina', disciplinaController.create);
router.get('/disciplina', disciplinaController.getAll);
router.get('/disciplina/:id', disciplinaController.getById);
router.put('/disciplina/:id', disciplinaController.update);
router.delete('/disciplina/:id', disciplinaController.delete);



export { router as userRoutes };
