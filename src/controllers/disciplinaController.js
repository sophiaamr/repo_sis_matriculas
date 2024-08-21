import DisciplinaModel from '../models/disciplinaModel.js'; 
import autoBind from 'auto-bind';

export class DisciplinaController {
    constructor() {
        autoBind(this)
    }

    async create(request, response) {
        try {
            const { nomeDisciplina, status, qtdAluno} = request.body


            if(!nomeDisciplina || !status || qtdAluno === undefined){
                return response.status(400).send("Revise as informações fornecidas")
            }

            const validStatus = ['ATIVO', 'CANCELADO', 'ENCERRADO']
            if(!validStatus.includes(status)) {
                return response.status(400).send("Status inválido")
            }

            DisciplinaModel.create( { nomeDisciplina, status, qtdAluno}, (err, result) => {
                if (err) {
                    console.error('Erro ao criar disciplina: ', err.message)
                    return response.status(500).send('Erro ao criar disciplina')
                }
                return response.status(201).json({
                    sucess: true,
                    message: 'Disciplina criada com sucesso',
                    result
                })
            })
        } catch (error) {
            console.error('Erro ao cirar disciplina: ', error.message)
            return response.status(500).json ({error: 'Erro interno do servidor'})
        }
    }





}