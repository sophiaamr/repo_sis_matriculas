import { Router } from 'express';
import { getDates, updateMatriculaDates, updateBoletoDates, getMatriculaDates } from '../controllers/OutrosController.js';

const router = Router();

router.get('/', (req, res) => {
    res.render('Outros'); // Renderiza a página 'Outros.ejs'
});

router.get('/datas', getDates);
router.post('/datas/matricula', updateMatriculaDates);
router.post('/datas/boleto', updateBoletoDates);
router.get('/matricula-dates', getMatriculaDates);

export { router as OutrosRoute };
