import { Router } from 'express';
import { UserController } from '../controllers/userController.js';

const router = Router();
const userController = new UserController();

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
router.get('/:id', userController.getById);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUserById);

export { router as UserRoute };


// import { CobrancaController } from '../controllers/cobrancaController.js';
// import { MatriculaController} from '../controllers/matriculaController.js'
// import { CursoController } from '../controllers/cursoController.js';
// import { DisciplinaController } from '../controllers/disciplinaController.js'


// const cobrancaController = new CobrancaController(); 
// const userController = new UserController();
// const matriculaController = new MatriculaController();
// const cursoController = new CursoController();
// const disciplinaController = new DisciplinaController();






// // Rotas para Curso
// router.post('/curso', cursoController.create);
// router.get('/curso', cursoController.getAll);
// router.get('/curso/:id', cursoController.getById);
// router.put('/curso/:id', cursoController.update);
// router.delete('/curso/:id', cursoController.delete);







