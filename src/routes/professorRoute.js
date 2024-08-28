import { Router } from 'express';
import { UserController } from '../controllers/userController.js';

const router = Router();
const userController = new UserController();

// Rotas para Professores
router.post('/', userController.createProfessor);
router.get('/', userController.getAllProfessors);
router.get('/:id', userController.getById);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUserById);

export { router as ProfessorRoute };
