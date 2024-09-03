import { Router } from 'express';
import { getDates, updateMatriculaDates, updateBoletoDates, getMatriculaDates } from '../controllers/OutrosController.js';

const router = Router();

router.get('/', (req, res) => {
    res.render('Outros'); // Renderiza a página 'Outros.ejs'
});

router.get('/', getDates);
router.post('/', updateMatriculaDates);
router.post('/', updateBoletoDates);
router.get('/', getMatriculaDates);

export { router as OutrosRoute };
