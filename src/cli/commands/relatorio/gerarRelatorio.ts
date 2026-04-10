import type { Context } from "../../../types/context.js";
import { delay } from "../../../utils/delay.js";
import { rl } from "../../index.js";

export async function gerarRelatorio(context: Context) {
	console.clear();
	console.log("------- Gerar Relatório -------");

	if (!context.funcionario) {
		console.log("Falha critica");
		process.exit(1);
	}

	if (!context.aeronave) {
		console.log("Aeronave não carregada");
		await delay(1000);
		return;
	}

	const relatorio = context.aeronave.relatorio.gerarRelatorio();

	console.clear();
	console.log("------- Relatório -------");
	console.log(relatorio);
	await rl.perguntar("Pressione uma Tecla para continuar...");
}
