import { Router } from 'express';
import UserController from '../controllers/userController.js'; // Corrija para importação padrão

const router = Router();
const userController = UserController; // Instância padrão exportada

router.post('/aluno', userController.createAluno);
router.post('/professor', userController.createProfessor);
router.post('/secretaria', userController.createSecretaria);

// Adicione outros métodos de rota se necessário

export { router as userRoutes };
