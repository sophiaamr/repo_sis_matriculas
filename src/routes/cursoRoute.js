import { Router } from "express";
import { CursoController  } from "../controllers/cursoController.js";

const router = Router();
const cursoController = new CursoController();


router.post('/', cursoController.create);
router.get('/', cursoController.getAll);
router.get('/:id', cursoController.getById);
router.put('/:id', cursoController.update);
router.delete('/:id', cursoController.delete);

export { router as CursoRoute };