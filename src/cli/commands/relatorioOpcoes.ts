import type { Question } from "../../service/Question.js";
import { rl } from "../index.js";

async function relatorioOpts() {
	const options = `----- RELATORIO -----\n
1 - Gerar Relatorio\n
2 - Salvar Relatorio em Arquivo\n
-----------------------\n\n`;

	const optAnswer = rl.perguntar(options);
}
