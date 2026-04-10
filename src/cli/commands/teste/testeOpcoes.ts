import type { Context } from "../../../types/context.js";
import { rl } from "../../index.js";
import { geralOpts } from "../geralOpcoes.js";
import { cadastroTeste } from "./cadastroTeste.js";
import { carregarTeste } from "./carregarTeste.js";

export async function testeOpts(context: Context) {
	const options = `-------- Teste --------\n
1 - Cadastrar e Adicionar Teste\n
2 - Carregar Teste\n
0 - Voltar\n
-----------------------\n\n`;

	let optAnswer: number | null = null;

	while (optAnswer !== 0) {
		console.clear();
		optAnswer = Number(await rl.perguntar(options));

		switch (optAnswer) {
			case 1:
				await cadastroTeste(context);
				break;

			case 2:
				await carregarTeste(context);
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
