import type { Question } from "../../service/question.js";
import { rl } from "../index.js";

async function testeOpts() {
    const options = `-------- Teste --------\n
1 - Cadastrar e Adicionar Teste\n
2 - Carregar Teste\n
-----------------------\n\n`;

    const optAnswer = rl.perguntar(options);
}