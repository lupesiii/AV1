import type { Context } from "../../../types/context.js";
import { rl } from "../../index.js";
import { geralOpts } from "../geralOpcoes.js";
import { associarFuncionario } from "./associarFuncionario.js";
import { cadastroEtapa } from "./cadastroEtapa.js";
import { finalizarEtapa } from "./finalizarEtapa.js";
import { iniciarEtapa } from "./iniciarEtapa.js";
import { listrFuncionarios } from "./listarFuncionarios.js";

export async function etapaOpts(context: Context) {
	const options = `-------- Etapas --------\n
1 - Adicionar Etapa\n
2 - Iniciar etapa\n
3 - Finalizar etapa\n
4 - Associar funcionario\n
5 - Listar funcionários\n
0 - Voltar\n
------------------------\n\n`;

	let optAnswer: number | null = null;
	while (optAnswer !== 0) {
		console.clear();
		optAnswer = Number(await rl.perguntar(options));
		switch (optAnswer) {
			case 1:
				await cadastroEtapa(context);
				break;

			case 2:
				await iniciarEtapa(context);
				break;

			case 3:
				await finalizarEtapa(context);
				break;

			case 4:
				await associarFuncionario(context);
				break;

			case 5:
				await listrFuncionarios(context);
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
