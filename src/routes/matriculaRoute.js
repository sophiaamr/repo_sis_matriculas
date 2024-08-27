import { Router } from "express";
import { MatriculaController } from "../controllers/matriculaController.js";

const router = Router();

const matriculaController = new MatriculaController();

router.post('/', matriculaController.create);
router.get('/', matriculaController.getAll);
router.get('/:id', matriculaController.getById);
router.put('/:id', matriculaController.update);
router.delete('/:id', matriculaController.delete);

export { router as MatriculaRoute };