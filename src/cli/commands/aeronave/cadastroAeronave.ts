import { Areas } from "../../../domain/enuns/Areas.js";
import { TipoAeronave } from "../../../domain/enuns/TipoAeronave.js";
import { AeronaveRepository } from "../../../infra/AeronaveRepository.js";
import { AeronaveService } from "../../../service/AeronaveService.js";
import { authService } from "../../../service/AuthService.js";
import type { Context } from "../../../types/context.js";
import { delay } from "../../../utils/delay.js";
import { rl } from "../../index.js";

export async function cadastroAeronave(context: Context) {
	console.clear();
	console.log("------- Cadastro Aeronave -------");

	const aRepo = new AeronaveRepository();
	const aService = new AeronaveService(aRepo);

	if (!context.funcionario) {
		console.log("Falha critica");
		process.exit(1);
	}
	const usuario = context.funcionario;

	const auth = new authService();

	const permissaoValida = auth.verificaPermissao(usuario, Areas.Aeronave);

	if (!permissaoValida) {
		console.clear();
		console.error("Você não possui permissão");
		await delay(2000);
		return;
	}
	const aeroCodigo = await rl.perguntar("Digite o código da aeronave: ");
	const aeroModelo = await rl.perguntar("Digite o modelo: ");

	let aeroTipo: TipoAeronave | null = null;
	while (aeroTipo === null) {
		const answer = await rl.perguntar(
			"Qual o tipo de aeronave\n1-Comercial\n2-Militar\n",
		);

		switch (Number(answer)) {
			case 1:
				aeroTipo = TipoAeronave.Comercial;
				break;

			case 2:
				aeroTipo = TipoAeronave.Militar;
				break;

			default:
				console.log("Inválido");
				break;
		}
	}

	const aeroCapacidade = await rl.perguntar("Digite a capacidade: ");
	const aeroAlcance = await rl.perguntar("Digite o alcance: ");

	const aeronaveData = {
		codigo: aeroCodigo,
		modelo: aeroModelo,
		tipo: aeroTipo,
		capacidade: Number(aeroCapacidade),
		alcance: Number(aeroAlcance),
	};

	try {
		await aService.salvar(aeronaveData);
		console.log("Cadastro bem sucedido...");
		await delay(2000);
	} catch (err) {
		console.error(err);
	}
}
