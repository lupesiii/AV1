import type { Context } from "../../types/context.js";
import { delay } from "../../utils/delay.js";
import { rl } from "../index.js";
import { aeronaveOpts } from "./aeronave/aeronaveOpcoes.js";
import { etapaOpts } from "./etapa/etapaOpcoes.js";
import { funcionarioOpts } from "./funcionario/funcionarioOpcoes.js";
import { pecaOpts } from "./peca/pecaOpcoes.js";
import { relatorioOpts } from "./relatorio/relatorioOpts.js";
import { testeOpts } from "./teste/testeOpcoes.js";

export async function geralOpts(context: Context) {
	console.clear();
	const optionsGerais = `Bem vindo, o que você deseja?\n
1 - Vizualizar opções dos Funcionários
2 - Vizualizar opções da  Aeronave
3 - Vizualizar opções das Etapas
4 - Vizualizar opções dos Testes
5 - Vizualizar opções das Peças
6 - Vizualizar opções do  relatório
0 - Sair\n`;

	let optionsAnswer: number | null = null;
	while (optionsAnswer !== 0) {
		optionsAnswer = Number(await rl.perguntar(optionsGerais));
		switch (optionsAnswer) {
			case 1:
				await funcionarioOpts(context);
				break;

			case 2:
				await aeronaveOpts(context);
				break;

			case 3:
				await etapaOpts(context);
				break;

			case 4:
				await testeOpts(context);
				break;

			case 5:
				await pecaOpts(context);
				break;

			case 6:
				await relatorioOpts(context);
				break;

			case 0:
				console.log("Saindo...");
				await delay(1000);
				rl.fechar();
				break;

			default:
				console.log("Invalido");
				break;
		}
		console.clear();
	}
}
