import { Router } from 'express';
import { UserController } from '../controllers/userController.js';

const router = Router();
const userController = new UserController();

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.updateUserById);
router.post('/auth', userController.login);
router.get('/aluno', userController.getByNumeroMatricula);

export { router as UserRoute };
