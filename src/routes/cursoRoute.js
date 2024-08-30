import { Router } from 'express';
import { CursoController } from '../controllers/cursoController.js';

const router = Router();
const cursoController = new CursoController();

// Rotas para cursos
router.post('/', cursoController.create);
router.get('/', cursoController.getAll);
router.get('/:id', cursoController.getById);
router.put('/:id', cursoController.update);
router.delete('/:id', cursoController.delete);

// Rota para obter o número de períodos de um curso específico
router.get('/cursos/:id', cursoController.getPeriodos);
router.get('/:cursoId/curriculo', cursoController.gerarCurriculo);

export { router as CursoRoute };
