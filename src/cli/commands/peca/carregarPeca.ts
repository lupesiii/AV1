import { Peca } from "../../../domain/entities/Peca.js";
import { Areas } from "../../../domain/enuns/Areas.js";
import { PecaRepository } from "../../../infra/PecaRepository.js";
import { authService } from "../../../service/AuthService.js";
import { PecaService } from "../../../service/PecaService.js";
import type { Context } from "../../../types/context.js";
import { delay } from "../../../utils/delay.js";
import { rl } from "../../index.js";
import { pecaOpts } from "./pecaOpcoes.js";

export async function carregarPeca(context: Context) {
	console.clear();
	console.log("------- Carregando Peça -------");

	const pRepo = new PecaRepository();
	const pService = new PecaService(pRepo);

	if (!context.funcionario) {
		console.log("Falha critica");
		process.exit(1);
	}

	if (!context.aeronave) {
		console.log("Aeronave não carregada");
		await delay(1000);
		return;
	}

	const auth = new authService();
	const permissaoValida = auth.verificaPermissao(
		context.funcionario,
		Areas.Aeronave,
	);

	if (!permissaoValida) {
		console.clear();
		console.error("Você não possui permissão");
		await delay(2000);
		return;
	}

	const pecaNome = (await rl.perguntar("Qual o nome: ")).toLowerCase();

	if (context.aeronave?.pecas.some((peca) => peca.nome === pecaNome)) {
		console.clear();
		console.log("Teste já carregado");
		await delay(2000);
		return;
	}

	const pecaCarregado = await pService.carregar(pecaNome);

	if (!(pecaCarregado instanceof Peca)) {
		await delay(2000);
		return;
	}

	context.aeronave?.pecas.push(pecaCarregado);
	console.clear();
	console.log("Peça carregado");
	await delay(1000);
	await pecaOpts(context);
}
