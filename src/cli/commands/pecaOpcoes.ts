import type { Question } from "../../service/question.js";
import { rl } from "../index.js";

async function pecaOpts() {
    const options = `-------- Peça --------\n
1 - Cadastrar e associar peça\n
2 - Carregar peça\n
3 - Atualizar status\n
----------------------\n\n`;

    const optAnswer = rl.perguntar(options);
}