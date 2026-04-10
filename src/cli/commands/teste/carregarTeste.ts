import { Teste } from "../../../domain/entities/Teste.js";
import { Areas } from "../../../domain/enuns/Areas.js";
import { TesteRepository } from "../../../infra/TesteRepository.js";
import { authService } from "../../../service/AuthService.js";
import { TesteService } from "../../../service/TesteService.js";
import type { Context } from "../../../types/context.js";
import { delay } from "../../../utils/delay.js";
import { rl } from "../../index.js";
import { testeOpts } from "./testeOpcoes.js";

export async function carregarTeste(context: Context) {
	console.clear();
	console.log("------- Carregando Teste -------");

	const tRepo = new TesteRepository();
	const tService = new TesteService(tRepo);

	if (!context.funcionario) {
		console.log("Falha critica");
		process.exit(1);
	}

	const auth = new authService();
	const permissaoValida = auth.verificaPermissao(
		context.funcionario,
		Areas.Teste,
	);

	if (!permissaoValida) {
		console.clear();
		console.error("Você não possui permissão");
		await delay(2000);
		return;
	}

	const testeId = await rl.perguntar("Qual o id do teste: ");

	if (context.aeronave?.testes.some((teste) => teste.id === testeId)) {
		console.clear();
		console.log("Teste já carregado");
		await delay(2000);
		return;
	}

	const testeCarregado = await tService.carregar(testeId);

	if (!(testeCarregado instanceof Teste)) {
		await delay(2000);
		return;
	}

	context.aeronave?.testes.push(testeCarregado);
	console.clear();
	console.log("Teste carregado");
	await delay(1000);
	await testeOpts(context);
}
