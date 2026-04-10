import type { Context } from "../../../types/context.js";
import { rl } from "../../index.js";
import { geralOpts } from "../geralOpcoes.js";
import { cadastroAeronave } from "./cadastroAeronave.js";
import { carregarAeronave } from "./carregarAeronave.js";

export async function aeronaveOpts(context: Context) {
	const options = `-------- Aeronave ----------\n
1 - Cadastrar aeronave\n
2 - Carregar aeronave\n
3 - Detalhes\n
0 - Voltar\n
----------------------------\n\n`;

	let optAnswer: number | null = null;

	while (optAnswer !== 0) {
		console.clear();
		optAnswer = Number(await rl.perguntar(options));

		switch (optAnswer) {
			case 1:
				await cadastroAeronave(context);
				break;

			case 2:
				await carregarAeronave(context);
				break;

			case 3: {
				console.clear();
				context.aeronave?.detalhes();
				await rl.perguntar("PRECIONE ALGUMA TECLA");
				break;
			}

			case 0:
				await geralOpts(context);
				break;

			default:
				console.log("Invalido");
				break;
		}
	}
}
