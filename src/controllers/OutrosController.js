import OutrosModel from '../models/OutrosModel.js';

export async function getDates(req, res) {
    try {
        const dates = await OutrosModel.getDates();
        res.json(dates);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function updateMatriculaDates(req, res) {
    const { startDate, endDate } = req.body;
    try {
        await OutrosModel.updateMatriculaDates(startDate, endDate);
        res.status(200).json({ message: 'Datas de matrícula alteradas com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function updateBoletoDates(req, res) {
    const { faturaDate, dataDeVencimento } = req.body;
    try {
        await OutrosModel.updateBoletoDates(faturaDate, dataDeVencimento);
        res.status(200).json({ message: 'Datas de boletos alteradas com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getMatriculaDates(req, res) {
    try {
        const dates = await OutrosModel.getDates();
        res.json(dates);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
