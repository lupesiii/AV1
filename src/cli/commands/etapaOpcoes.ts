import type { Question } from "../../service/question.js";
import { rl } from "../index.js";

async function etapaOpts() {
    const options = `-------- Etapas --------\n
1 - Adicionar Etapa\n
2 - Iniciar etapa\n
3 - Finalizar etapa\n
4 - Associar funcionario\n
5 - Listar funcionários\n
------------------------\n\n`;

    const optAnswer = rl.perguntar(options);
}