// routes/disciplinaRoute.js

import { Router } from 'express';
import { DisciplinaController } from '../controllers/disciplinaController.js';


const router = Router();
const disciplinaController = new DisciplinaController();


router.post('/', disciplinaController.create);        
router.get('/', disciplinaController.getAll);        
router.get('/:id', disciplinaController.getById);    
router.put('/:id', disciplinaController.update);     
router.delete('/:id', disciplinaController.delete);  
// router.get('/:idDisciplina/alunos', disciplinaController.getAlunosByDisciplina);
router.get('/disciplinas/:idDisciplina/visualizarAlunos', disciplinaController.visualizarAlunos);


export { router as DisciplinaRoute };
