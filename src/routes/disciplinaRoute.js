// routes/disciplinaRoute.js

import { Router } from 'express';
import { DisciplinaController } from '../controllers/disciplinaController.js';


const router = Router();
const disciplinaController = new DisciplinaController();

// Rotas CRUD para disciplinas
router.post('/', disciplinaController.create);        // Certifique-se de que o método 'create' está definido em DisciplinaController
router.get('/', disciplinaController.getAll);         // Certifique-se de que o método 'getAll' está definido em DisciplinaController
router.get('/:id', disciplinaController.getById);     // Certifique-se de que o método 'getById' está definido em DisciplinaController
router.put('/:id', disciplinaController.update);      // Certifique-se de que o método 'update' está definido em DisciplinaController
router.delete('/:id', disciplinaController.delete);   // Certifique-se de que o método 'delete' está definido em DisciplinaController




export { router as DisciplinaRoute };
