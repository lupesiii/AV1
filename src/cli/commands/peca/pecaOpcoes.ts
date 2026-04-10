import type { Context } from "../../../types/context.js";
import { rl } from "../../index.js";
import { geralOpts } from "../geralOpcoes.js";
import { atualizaStatus } from "./atualizaStatus.js";
import { cadastroPeca } from "./cadastroPeca.js";
import { carregarPeca } from "./carregarPeca.js";

export async function pecaOpts(context: Context) {
	const options = `-------- Peça --------\n
1 - Cadastrar e associar peça\n
2 - Carregar peça\n
3 - Atualizar status\n
0 - Voltar\n
----------------------\n\n`;

	let optAnswer: number | null = null;
	while (optAnswer !== 0) {
		console.clear();
		optAnswer = await Number(await rl.perguntar(options));
		switch (optAnswer) {
			case 1:
				await cadastroPeca(context);
				break;

			case 2:
				await carregarPeca(context);
				break;

			case 3:
				await atualizaStatus(context);
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
