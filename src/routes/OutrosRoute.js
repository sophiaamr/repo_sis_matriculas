import { Router } from 'express';
import { getDates, updateMatriculaDates, updateBoletoDates, getMatriculaDates } from '../controllers/OutrosController.js';

const router = Router();

router.get('/', (req, res) => {
    res.render('Outros'); 
});

router.get('/dates', getDates);
router.post('/matricula-dates', updateMatriculaDates);
router.post('/boleto-dates', updateBoletoDates);
router.get('/matricula-dates', getMatriculaDates);

export { router as OutrosRoute };
