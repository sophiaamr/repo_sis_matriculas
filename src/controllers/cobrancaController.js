import CobrancaModel from '../models/cobrancaModel.js'; 
import autoBind from 'auto-bind';

export class CobrancaController {
    constructor() {
        autoBind(this);
    }

    async create(request, response) {
        try {
            const { status, juros, dataInicio, dataFim } = request.body;

            if (!status || juros === undefined || !dataInicio || !dataFim) {
                return response.status(400).send("Revise as informações fornecidas.");
            }

            // Verifica se status é um valor válido do Enum
            const validStatuses = ['PENDENTE', 'PAGO', 'ATRASADO'];
            if (!validStatuses.includes(status)) {
                return response.status(400).send("Status inválido.");
            }

            CobrancaModel.create({ status, juros, dataInicio, dataFim }, (err, result) => {
                if (err) {
                    console.error('Erro ao criar cobrança:', err.message);
                    return response.status(500).send('Erro ao criar cobrança.');
                }
                return response.status(201).json({
                    success: true,
                    message: "Cobrança criada com sucesso",
                    result
                });
            });

        } catch (error) {
            console.error('Erro ao criar cobrança:', error.message);
            return response.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async getAll(request, response) {
        try {
            CobrancaModel.getAll((err, cobrancas) => {
                if (err) {
                    console.error('Erro ao buscar cobranças:', err.message);
                    return response.status(500).send('Erro ao buscar cobranças.');
                }
                return response.status(200).json(cobrancas);
            });
        } catch (error) {
            console.error('Erro ao buscar cobranças:', error.message);
            return response.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async getById(request, response) {
        const { id } = request.params;

        try {
            CobrancaModel.getById(id, (err, cobranca) => {
                if (err) {
                    console.error('Erro ao buscar cobrança:', err.message);
                    return response.status(500).send('Erro ao buscar cobrança.');
                }
                if (!cobranca) {
                    return response.status(404).send('Cobrança não encontrada.');
                }
                return response.status(200).json(cobranca);
            });
        } catch (error) {
            console.error('Erro ao buscar cobrança:', error.message);
            return response.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async update(request, response) {
        const { id } = request.params;
        const { status, juros, dataInicio, dataFim } = request.body;

        try {
            // Verifica se status é um valor válido do Enum
            const validStatuses = ['PENDENTE', 'PAGO', 'ATRASADO'];
            if (status && !validStatuses.includes(status)) {
                return response.status(400).send("Status inválido.");
            }

            CobrancaModel.update(id, { status, juros, dataInicio, dataFim }, (err, result) => {
                if (err) {
                    console.error('Erro ao atualizar cobrança:', err.message);
                    return response.status(500).send('Erro ao atualizar cobrança.');
                }
                if (result.affectedRows === 0) {
                    return response.status(404).send('Cobrança não encontrada.');
                }
                return response.status(200).json({
                    success: true,
                    message: "Cobrança atualizada com sucesso"
                });
            });
        } catch (error) {
            console.error('Erro ao atualizar cobrança:', error.message);
            return response.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async delete(request, response) {
        const { id } = request.params;

        try {
            CobrancaModel.delete(id, (err, result) => {
                if (err) {
                    console.error('Erro ao deletar cobrança:', err.message);
                    return response.status(500).send('Erro ao deletar cobrança.');
                }
                if (result.affectedRows === 0) {
                    return response.status(404).send('Cobrança não encontrada.');
                }
                return response.status(200).json({
                    success: true,
                    message: "Cobrança deletada com sucesso"
                });
            });
        } catch (error) {
            console.error('Erro ao deletar cobrança:', error.message);
            return response.status(500).json({ error: "Erro interno do servidor" });
        }
    }
}
