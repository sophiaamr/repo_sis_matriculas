import CurriculoModel from '../models/curriculoModel.js';
import autoBind from 'auto-bind';

export class CurriculoController {
    constructor() {
        autoBind(this);
    }

    async create(request, response) {
        const { idCurso, idDisciplina, idProfessor, idPeriodo } = request.body;

        try {
            CurriculoModel.create({ idCurso, idDisciplina, idProfessor, idPeriodo }, (err, result) => {
                if (err) {
                    console.error('Erro ao criar currículo:', err.message);
                    return response.status(400).render('curriculo', { message: 'Erro ao criar currículo. Verifique os dados fornecidos.' });
                }
                return response.status(201).render('curriculo', { message: 'Currículo criado com sucesso!' });
            });
        } catch (error) {
            console.error('Erro ao criar currículo:', error.message);
            return response.status(500).render('curriculo', { message: 'Erro interno do servidor.' });
        }
    }

    async getAll(request, response) {
        try {
            CurriculoModel.getAll((err, curriculos) => {
                if (err) {
                    console.error('Erro ao buscar currículos:', err.message);
                    return response.status(500).render('curriculo', { message: 'Erro ao buscar currículos.' });
                }
                return response.status(200).render('curriculo', { curriculos });
            });
        } catch (error) {
            console.error('Erro ao buscar currículos:', error.message);
            return response.status(500).render('curriculo', { message: "Erro interno do servidor" });
        }
    }

    async getById(request, response) {
        const { id } = request.params;

        try {
            CurriculoModel.getById(id, (err, curriculo) => {
                if (err) {
                    console.error('Erro ao buscar currículo por ID:', err.message);
                    return response.status(500).render('curriculo', { message: 'Erro ao buscar currículo.' });
                }
                if (!curriculo) {
                    return response.status(404).render('curriculo', { message: 'Currículo não encontrado.' });
                }
                return response.status(200).render('curriculo', { curriculo });
            });
        } catch (error) {
            console.error('Erro ao buscar currículo por ID:', error.message);
            return response.status(500).render('curriculo', { message: "Erro interno do servidor" });
        }
    }

    async update(request, response) {
        const { id } = request.params;
        const { idCurso, idDisciplina, idProfessor, idPeriodo } = request.body;

        try {
            CurriculoModel.update(id, { idCurso, idDisciplina, idProfessor, idPeriodo }, (err, result) => {
                if (err) {
                    console.error('Erro ao atualizar currículo:', err.message);
                    return response.status(500).render('curriculo', { message: 'Erro ao atualizar currículo.' });
                }
                if (result.affectedRows === 0) {
                    return response.status(404).render('curriculo', { message: 'Currículo não encontrado.' });
                }
                return response.status(200).render('curriculo', { message: 'Currículo atualizado com sucesso!' });
            });
        } catch (error) {
            console.error('Erro ao atualizar currículo:', error.message);
            return response.status(500).render('curriculo', { message: 'Erro interno do servidor' });
        }
    }

    async delete(request, response) {
        const { id } = request.params;

        try {
            CurriculoModel.delete(id, (err, result) => {
                if (err) {
                    console.error('Erro ao deletar currículo:', err.message);
                    return response.status(500).render('curriculo', { message: 'Erro ao deletar currículo.' });
                }
                if (result.affectedRows === 0) {
                    return response.status(404).render('curriculo', { message: 'Currículo não encontrado.' });
                }
                return response.status(200).render('curriculo', { message: 'Currículo deletado com sucesso!' });
            });
        } catch (error) {
            console.error('Erro ao deletar currículo:', error.message);
            return response.status(500).render('curriculo', { message: 'Erro interno do servidor' });
        }
    }
}
