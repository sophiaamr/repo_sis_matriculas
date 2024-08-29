import { Router } from 'express';
import { UserController } from '../controllers/userController.js';

const router = Router();
const userController = new UserController();

router.get('/', userController.getAllAlunos);
router.get('/disciplinas/:disciplinaId/alunos', userController.getAlunosByDisciplina);
router.post('/', userController.createAluno);
router.get('/:id', userController.getById);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUserById);

export { router as AlunoRoute };