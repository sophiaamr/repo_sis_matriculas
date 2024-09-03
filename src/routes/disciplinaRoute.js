// routes/disciplinaRoute.js

import { Router } from 'express';
import { DisciplinaController } from '../controllers/disciplinaController.js';


const router = Router();
const disciplinaController = new DisciplinaController();

router.get('/cadastrarDisciplinas', disciplinaController.showCadastroForm)
router.post('/cadastrarDisciplinas', disciplinaController.create);
//router.post('/', disciplinaController.create);    
//router.post('/cadastrarDisciplinas', disciplinaController.create);    
router.get('/', disciplinaController.getAll);        
router.get('/:id', disciplinaController.getById);    
router.put('/:id', disciplinaController.update);     
router.delete('/:id', disciplinaController.delete);  
router.get('/:idDisciplina/alunos', disciplinaController.getAlunosByDisciplina);
router.get('/:idDisciplina/visualizarAlunos', disciplinaController.visualizarAlunos);



export { router as DisciplinaRoute };
