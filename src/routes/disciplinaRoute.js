// routes/disciplinaRoute.js

import { Router } from 'express';
import { DisciplinaController } from '../controllers/disciplinaController.js';


const router = Router();
const disciplinaController = new DisciplinaController();

router.get('/cadastrarDisciplinas', disciplinaController.showCadastroForm)
router.post('/cadastrarDisciplinas', disciplinaController.create);
router.get('/', disciplinaController.getAll);        
router.get('/:id', disciplinaController.getById);    
router.put('/:id', disciplinaController.update);     
router.delete('/:idDisciplina', disciplinaController.delete);  
router.get('/:idDisciplina/alunos', disciplinaController.getAlunosByDisciplina);
router.get('/:idDisciplina/visualizarAlunos', disciplinaController.visualizarAlunos);
router.post('/associarProfessor', disciplinaController.associateWithProfessor);
// router.get('/:idAluno/verDisciplinasCadastradas', disciplinaController.verDisciplinasCadastradas);



export { router as DisciplinaRoute };
