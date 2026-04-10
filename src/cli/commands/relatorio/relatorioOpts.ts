import type { Context } from "../../../types/context.js";
import { rl } from "../../index.js";
import { geralOpts } from "../geralOpcoes.js";
import { gerarRelatorio } from "./gerarRelatorio.js";
import { salvarRelatorio } from "./salvarRelatorio.js";

export async function relatorioOpts(context: Context) {
	const options = `-------- Relatório --------\n
1 - Gerar Relatório\n
2 - Salvar Relatório\n
0 - Voltar\n
-----------------------\n\n`;

	let optAnswer: number | null = null;

	while (optAnswer !== 0) {
		console.clear();
		optAnswer = Number(await rl.perguntar(options));

		switch (optAnswer) {
			case 1:
				await gerarRelatorio(context);
				break;

			case 2:
				await salvarRelatorio(context);
				break;

			case 0:
				await geralOpts(context);
				break;

			default:
				console.log("Invalido");
				break;
		}
	}
}
