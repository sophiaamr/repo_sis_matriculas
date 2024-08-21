import UserModel from '../models/userModel.js'; // Import default
import autoBind from 'auto-bind';

export class UserController {
    constructor() {
        autoBind(this);
    }

    async create(request, response) {
        try {
            const { nome, cpf, telefone, email, senha } = request.body;

            if (!nome || !cpf || !telefone || !email || !senha) {
                return response.status(400).send("Revise as informações fornecidas.");
            }

            UserModel.create({ nome, cpf, telefone, email, senha }, (err, result) => {
                if (err) {
                    console.error('Erro ao criar usuário:', err.message);
                    return response.status(500).send('Erro ao criar usuário.');
                }
                return response.status(201).json({
                    success: true,
                    message: "Usuário criado com sucesso",
                    result
                });
            });

        } catch (error) {
            console.error('Erro ao criar usuário:', error.message);
            return response.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async getAll(request, response) {
        try {
            UserModel.getAll((err, users) => {
                if (err) {
                    console.error('Erro ao buscar usuários:', err.message);
                    return response.status(500).send('Erro ao buscar usuários.');
                }
                return response.status(200).json(users);
            });
        } catch (error) {
            console.error('Erro ao buscar usuários:', error.message);
            return response.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async getById(request, response) {
        const { id } = request.params;

        try {
            UserModel.getById(id, (err, user) => {
                if (err) {
                    console.error('Erro ao buscar usuário:', err.message);
                    return response.status(500).send('Erro ao buscar usuário.');
                }
                if (!user) {
                    return response.status(404).send('Usuário não encontrado.');
                }
                return response.status(200).json(user);
            });
        } catch (error) {
            console.error('Erro ao buscar usuário:', error.message);
            return response.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async update(request, response) {
        const { id } = request.params;
        const { nome, cpf, telefone, email, senha } = request.body;

        try {
            UserModel.update(id, { nome, cpf, telefone, email, senha }, (err, result) => {
                if (err) {
                    console.error('Erro ao atualizar usuário:', err.message);
                    return response.status(500).send('Erro ao atualizar usuário.');
                }
                if (result.affectedRows === 0) {
                    return response.status(404).send('Usuário não encontrado.');
                }
                return response.status(200).json({
                    success: true,
                    message: "Usuário atualizado com sucesso"
                });
            });
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error.message);
            return response.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async delete(request, response) {
        const { id } = request.params;

        try {
            UserModel.delete(id, (err, result) => {
                if (err) {
                    console.error('Erro ao deletar usuário:', err.message);
                    return response.status(500).send('Erro ao deletar usuário.');
                }
                if (result.affectedRows === 0) {
                    return response.status(404).send('Usuário não encontrado.');
                }
                return response.status(200).json({
                    success: true,
                    message: "Usuário deletado com sucesso"
                });
            });
        } catch (error) {
            console.error('Erro ao deletar usuário:', error.message);
            return response.status(500).json({ error: "Erro interno do servidor" });
        }
    }
}
