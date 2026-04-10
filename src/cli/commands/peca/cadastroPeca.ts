import { Peca } from "../../../domain/entities/Peca.js";
import { Areas } from "../../../domain/enuns/Areas.js";
import { StatusPeca } from "../../../domain/enuns/StatusPeca.js";
import { TipoPeca } from "../../../domain/enuns/TipoPeca.js";
import { PecaRepository } from "../../../infra/PecaRepository.js";
import { authService } from "../../../service/AuthService.js";
import { PecaService } from "../../../service/PecaService.js";
import type { Context } from "../../../types/context.js";
import { delay } from "../../../utils/delay.js";
import { rl } from "../../index.js";
import { pecaOpts } from "./pecaOpcoes.js";

export async function cadastroPeca(context: Context) {
	console.clear();
	console.log("------- Cadastro Peça -------");

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

	const usuario = context.funcionario;

	const auth = new authService();

	const permissaoValida = auth.verificaPermissao(usuario, Areas.Peca);

	if (!permissaoValida) {
		console.clear();
		console.error("Você não possui permissão");
		await delay(2000);
		return;
	}

	const pecaNome = (
		await rl.perguntar("Digite o nome da peça: ")
	).toLowerCase();
	const pecaFornecedor = await rl.perguntar("Digite o fornecedor: ");

	let pecaTipo: TipoPeca | null = null;
	while (pecaTipo === null) {
		const answer = await rl.perguntar(
			"Qual o tipo de peça\n1-Nacional\n2-Importada\n",
		);

		switch (Number(answer)) {
			case 1:
				pecaTipo = TipoPeca.Nacional;
				break;

			case 2:
				pecaTipo = TipoPeca.Importada;
				break;

			default:
				console.log("Inválido");
				break;
		}
	}

	let pecaStatus: StatusPeca | null = null;
	while (pecaStatus === null) {
		const answer = await rl.perguntar(
			"Qual o status da peça\n1-Produção\n2-Transporte\n3-Pronta\n",
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

	const pecaData = {
		nome: pecaNome,
		tipo: pecaTipo,
		fornecedor: pecaFornecedor,
		status: pecaStatus,
	};

	try {
		await pService.salvar(pecaData);

		const peca = new Peca(
			pecaData.nome,
			pecaData.tipo,
			pecaData.fornecedor,
			pecaData.status,
		);

		context.aeronave.pecas.push(peca);
		console.log("Cadastro bem sucedido...");
		await delay(2000);
		pecaOpts(context);
	} catch (err) {
		console.error(err);
	}
}
