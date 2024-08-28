import { Router } from 'express';
import { UserController } from '../controllers/userController.js';

const router = Router();
const userController = new UserController();

// Rotas para Secretarias
router.post('/', userController.createSecretaria);
router.get('/', userController.getAllSecretaria);
router.get('/:id', userController.getById);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUserById);

export { router as SecretariaRoute };
