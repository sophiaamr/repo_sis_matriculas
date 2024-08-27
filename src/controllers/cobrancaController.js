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
                return response.status(400).render('financeiro', { message: "Revise as informações fornecidas." });
            }

            const validStatus = ['EM ABERTO', 'PAGO'];
            if (!validStatus.includes(status)) {
                return response.status(400).render('financeiro', { message: "Status inválido." });
            }

            CobrancaModel.create({ status, juros, dataInicio, dataFim }, (err, result) => {
                if (err) {
                    console.error('Erro ao criar cobrança:', err.message);
                    return response.status(500).render('financeiro', { message: 'Erro ao criar cobrança.' });
                }
                return response.status(201).render('financeiro', {
                    success: true,
                    message: "Cobrança criada com sucesso",
                    result
                });
            });

        } catch (error) {
            console.error('Erro ao criar cobrança:', error.message);
            return response.status(500).render('financeiro', { message: "Erro interno do servidor" });
        }
    }

    async getAll(request, response) {
        try {
            CobrancaModel.getAll((err, cobrancas) => {
                if (err) {
                    console.error('Erro ao buscar cobranças:', err.message);
                    return response.status(500).render('financeiro', { message: 'Erro ao buscar cobranças.' });
                }
                return response.status(200).render('financeiro', { cobrancas });
            });
        } catch (error) {
            console.error('Erro ao buscar cobranças:', error.message);
            return response.status(500).render('financeiro', { message: "Erro interno do servidor" });
        }
    }

    async getById(request, response) {
        const { id } = request.params;

        try {
            CobrancaModel.getById(id, (err, cobranca) => {
                if (err) {
                    console.error('Erro ao buscar cobrança:', err.message);
                    return response.status(500).render('financeiro', { message: 'Erro ao buscar cobrança.' });
                }
                if (!cobranca) {
                    return response.status(404).render('financeiro', { message: 'Cobrança não encontrada.' });
                }
                return response.status(200).render('financeiro', { cobranca });
            });
        } catch (error) {
            console.error('Erro ao buscar cobrança:', error.message);
            return response.status(500).render('financeiro', { message: "Erro interno do servidor" });
        }
    }

    async update(request, response) {
        const { id } = request.params;
        const { status, juros, dataInicio, dataFim } = request.body;

        try {
            const validStatuses = ['EM ABERTO', 'PAGO'];
            if (status && !validStatuses.includes(status)) {
                return response.status(400).render('financeiro', { message: "Status inválido." });
            }

            CobrancaModel.update(id, { status, juros, dataInicio, dataFim }, (err, result) => {
                if (err) {
                    console.error('Erro ao atualizar cobrança:', err.message);
                    return response.status(500).render('financeiro', { message: 'Erro ao atualizar cobrança.' });
                }
                if (result.affectedRows === 0) {
                    return response.status(404).render('financeiro', { message: 'Cobrança não encontrada.' });
                }
                return response.status(200).render('financeiro', {
                    success: true,
                    message: "Cobrança atualizada com sucesso"
                });
            });
        } catch (error) {
            console.error('Erro ao atualizar cobrança:', error.message);
            return response.status(500).render('financeiro', { message: "Erro interno do servidor" });
        }
    }

    async delete(request, response) {
        const { id } = request.params;

        try {
            CobrancaModel.delete(id, (err, result) => {
                if (err) {
                    console.error('Erro ao deletar cobrança:', err.message);
                    return response.status(500).render('financeiro', { message: 'Erro ao deletar cobrança.' });
                }
                if (result.affectedRows === 0) {
                    return response.status(404).render('financeiro', { message: 'Cobrança não encontrada.' });
                }
                return response.status(200).render('financeiro', {
                    success: true,
                    message: "Cobrança deletada com sucesso"
                });
            });
        } catch (error) {
            console.error('Erro ao deletar cobrança:', error.message);
            return response.status(500).render('financeiro', { message: "Erro interno do servidor" });
        }
    }
}
