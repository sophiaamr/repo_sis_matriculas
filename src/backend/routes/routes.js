
import { Router } from "express";

// Esses são os arquivos de rotas que vocês vão fazer, então o numero de linhas deve ser igual ao numero de arquivos de rotas (tirando o route.js)

import { userRoutes } from "./userRoutes.js";

const routes = Router();

// Aqui vocês devem seguir esse padrão cão importar o arquivo de cada rota de entidade como Usuario | Login | Funcionario

routes.use('/users', userRoutes);

// Exportando a variavel configurada

export { routes };