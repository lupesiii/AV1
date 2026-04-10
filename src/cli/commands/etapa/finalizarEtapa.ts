import { Areas } from "../../../domain/enuns/Areas.js";
import { StatusEtapa } from "../../../domain/enuns/StatusEtapa.js";
import { authService } from "../../../service/AuthService.js";
import type { Context } from "../../../types/context.js";
import { delay } from "../../../utils/delay.js";
import { etapaFind } from "../../../utils/etapaFind.js";
import { rl } from "../../index.js";

export async function finalizarEtapa(context: Context) {
	console.clear();
	console.log("------- Finalizar Etapa -------");

	if (!context.funcionario) {
		console.log("Falha critica");
		process.exit(1);
	}

	if (!context.aeronave) {
		console.log("Aeronave não carregada");
		await delay(1000);
		return;
	}

	const usuario = context.funcionario;

	const auth = new authService();

	const permissaoValida = auth.verificaPermissao(usuario, Areas.Etapa);

	if (!permissaoValida) {
		console.clear();
		console.error("Você não possui permissão");
		await delay(2000);
		return;
	}

	const etapaNome = (
		await rl.perguntar("Digite o nome da etapa: ")
	).toLowerCase();

	const etapa = await etapaFind(context.aeronave, etapaNome);

	if (!etapa) return;

	if (etapa.status !== StatusEtapa.Andamento) {
		console.log(`Etapa não está em andamento`);
		await delay(1000);
		return;
	}

	const etapaIndex = context.aeronave.etapas.indexOf(etapa);

	if (etapaIndex > 0) {
		const etapaAnterior = context.aeronave.etapas[etapaIndex - 1];
		if (etapaAnterior?.status !== StatusEtapa.Concluida) {
			console.log(`Etapa anterior pendente`);
			await delay(1000);
			return;
		}
	}

	context.aeronave.etapas[etapaIndex]?.finalizar();
	console.log("Etapa finalizada");
	await delay(1000);
}
