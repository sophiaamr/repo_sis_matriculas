import { Router } from "express";
import { UserController } from "../controllers/userController.js";

const router = Router();

const userController = new UserController();

router.get('/', userController.getAll);
router.post('/', userController.create);
router.put('/', userController.update);
router.delete('/addresses', userController.delete);

export { router as userRoutes };
