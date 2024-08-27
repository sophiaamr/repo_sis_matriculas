import { Router } from "express";
import { CobrancaController } from "../controllers/cobrancaController.js";

const router = Router();

const cobrancaController = new CobrancaController();


router.post('/', cobrancaController.create);
router.get('/', cobrancaController.getAll);
router.get('/:id', cobrancaController.getById);
router.put('/:id', cobrancaController.update);
router.delete('/:id', cobrancaController.delete);

export { router as CobrancaRoute };