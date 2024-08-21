import { Router } from 'express';
import UserController from '../controllers/userController.js'; 

const router = Router();
const userController = UserController; 

router.post('/aluno', userController.createAluno);
router.get('/aluno', userController.getAllAlunos);
router.post('/professor', userController.createProfessor);
router.get('/professor', userController.getAllProfessors);
router.post('/secretaria', userController.createSecretaria);
router.get('/secretaria', userController.getAllSecretaria);
router.delete('/:id', UserController.deleteUser);
router.put('/:id', UserController.updateUserById);
router.get('/:id', UserController.getById);




export { router as userRoutes };
