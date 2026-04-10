import { Areas } from "../../../domain/enuns/Areas.js";
import { StatusPeca } from "../../../domain/enuns/StatusPeca.js";
import { PecaRepository } from "../../../infra/PecaRepository.js";
import { authService } from "../../../service/AuthService.js";
import { PecaService } from "../../../service/PecaService.js";
import type { Context } from "../../../types/context.js";
import { delay } from "../../../utils/delay.js";
import { rl } from "../../index.js";
import { pecaOpts } from "./pecaOpcoes.js";

export async function atualizaStatus(context: Context) {
	console.clear();
	console.log("------- Atualiza Status -------");

	const pRepo = new PecaRepository();
	const pService = new PecaService(pRepo);

	if (!context.funcionario) {
		console.log("Falha critica");
		process.exit(1);
	}

	const usuario = context.funcionario;

	const auth = new authService();

	const permissaoValida = auth.verificaPermissao(usuario, Areas.Peca);

	if (!permissaoValida) {
		console.clear();
		console.error("Você não possui permissão");
		await delay(2000);
		return;
	}

	if (!context.aeronave) {
		console.log("Aeronave não carregada");
		await delay(1000);
		return;
	}

	const pecaNome = await rl.perguntar("Digite o nome da Peça: ");

	const peca = context.aeronave.pecas.find((peca) => peca.nome === pecaNome);

	if (!peca) {
		console.log("Nenhuma peça encontrada");
		await delay(1000);
		return null;
	}

	let pecaStatus: StatusPeca | null = null;
	while (pecaStatus === null) {
		const answer = await rl.perguntar(
			"Qual o status da peça\n1-Producao\n2-Transporte\n3-Pronta\n",
		);

		switch (Number(answer)) {
			case 1:
				pecaStatus = StatusPeca.producao;
				break;

			case 2:
				pecaStatus = StatusPeca.transporte;
				break;

			case 3:
				pecaStatus = StatusPeca.pronta;
				break;

			default:
				console.log("Inválido");
				break;
		}
	}

	const pecaIndex = context.aeronave.pecas.indexOf(peca);

	try {
		await pService.salvar(peca);
	} catch (err) {
		console.log(err);
	}

	context.aeronave.pecas[pecaIndex]?.atualizarStatus(pecaStatus);
	console.log("Peça status atualizado");
	await delay(1000);
	await pecaOpts(context);
}
