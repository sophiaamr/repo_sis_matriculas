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
