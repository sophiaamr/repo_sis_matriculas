import { Router } from 'express';
import UserController from '../controllers/userController.js'; 

const router = Router();
const userController = UserController; 

router.post('/aluno', userController.createAluno);
router.post('/professor', userController.createProfessor);
router.post('/secretaria', userController.createSecretaria);


export { router as userRoutes };
