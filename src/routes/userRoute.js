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
router.get('/perfil/aluno/:id', userController.showAlunoProfile);
router.get('/perfil/professor/:id', userController.showProfessorProfile)
router.get('/perfil/secretaria/:id', userController.showSecretariaProfile)

export { router as UserRoute };
