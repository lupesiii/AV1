import type { Context } from "../../../types/context.js";
import { rl } from "../../index.js";
import { geralOpts } from "../geralOpcoes.js";
import { cadastroFuncionario } from "./cadastroFuncionario.js";
import { carregarFuncionario } from "./carregarFuncionario.js";

export async function funcionarioOpts(context: Context) {
	const options = `-------- Funcionario --------\n
1 - Cadastrar funcionário\n
2 - Carregar funcionário\n
0 - Voltar
-----------------------------\n\n`;

	let optAnswer: number | null = null;
	while (optAnswer !== 0) {
		console.clear();
		optAnswer = Number(await rl.perguntar(options));
		switch (optAnswer) {
			case 1:
				await cadastroFuncionario(context);
				break;

			case 2:
				await carregarFuncionario(context);
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
