import { Router } from 'express';
import { UserController } from '../controllers/userController.js';

const router = Router();
const userController = new UserController();

// Rotas para Alunos
router.post('/', userController.createAluno);
router.get('/', userController.getAllAlunos);
router.get('/disciplinas/:disciplinaId/alunos', userController.getAlunosByDisciplina);
router.get('/:id', userController.getById);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUserById);

export { router as AlunoRoute };