import { Router } from "express";
import { CurriculoController } from "../controllers/curriculoController.js";

const router = new Router();
const curriculoController = new CurriculoController();


router.post('/', curriculoController.create);
router.get('/', curriculoController.getAll);
router.get('/:id', curriculoController.getById);
router.put('/:id', curriculoController.update);
router.delete('/:id', curriculoController.delete);

export {router as CurriculoRoute}