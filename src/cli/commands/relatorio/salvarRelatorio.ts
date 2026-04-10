import { RelatorioRepository } from "../../../infra/RelatorioRepository.js";
import { RelatorioService } from "../../../service/RelatorioService.js";
import type { Context } from "../../../types/context.js";
import { delay } from "../../../utils/delay.js";

export async function salvarRelatorio(context: Context) {
	console.clear();
	console.log("------- Salvar Relatório -------");

	const rRepo = new RelatorioRepository();
	const rService = new RelatorioService(rRepo);

	if (!context.funcionario) {
		console.log("Falha critica");
		process.exit(1);
	}

	if (!context.aeronave) {
		console.log("Aeronave não carregada");
		await delay(1000);
		return;
	}

	rService.salvar(context.aeronave);
}
