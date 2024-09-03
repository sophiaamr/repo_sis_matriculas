import { connection } from '../db/connection.js';

class OutrosModel {
    static async getDates() {
        try {
            const [rows] = await connection.promise().query('SELECT * FROM datas WHERE id = 1 LIMIT 1');
            return rows[0];
        } catch (err) {
            console.error('Erro ao obter datas:', err.message);
            throw err;
        }
    }

    static async updateMatriculaDates(matricula_start, matricula_end) {
        try {
            await connection.promise().query(
                'UPDATE datas SET matricula_start = ?, matricula_end = ? WHERE id = 1',
                [matricula_start, matricula_end]
            );
        } catch (err) {
            console.error('Erro ao alterar datas de matrícula:', err.message);
            throw err;
        }
    }

    static async updateBoletoDates(fatura_date, data_de_vencimento) {
        try {
            await connection.promise().query(
                'UPDATE datas SET fatura_date = ?, data_de_vencimento = ? WHERE id = 1',
                [fatura_date, data_de_vencimento]
            );
        } catch (err) {
            console.error('Erro ao alterar datas de boletos:', err.message);
            throw err;
        }
    }
}

export default OutrosModel;
