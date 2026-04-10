import { Teste } from "../../../domain/entities/Teste.js";
import { Areas } from "../../../domain/enuns/Areas.js";
import { ResultadoTeste } from "../../../domain/enuns/ResultadoTeste.js";
import { TipoTeste } from "../../../domain/enuns/TipoTeste.js";
import { TesteRepository } from "../../../infra/TesteRepository.js";
import { authService } from "../../../service/AuthService.js";
import { TesteService } from "../../../service/TesteService.js";
import type { Context } from "../../../types/context.js";
import { delay } from "../../../utils/delay.js";
import { rl } from "../../index.js";
import { testeOpts } from "./testeOpcoes.js";

export async function cadastroTeste(context: Context) {
	console.clear();
	console.log("------- Cadastro Teste -------");

	const tRepo = new TesteRepository();
	const tService = new TesteService(tRepo);

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

	const permissaoValida = auth.verificaPermissao(usuario, Areas.Teste);

	if (!permissaoValida) {
		console.clear();
		console.error("Você não possui permissão");
		await delay(2000);
		return;
	}
	const testeId = await rl.perguntar("Digite o id do teste: ");

	let testeTipo: TipoTeste | null = null;
	while (testeTipo === null) {
		const answer = await rl.perguntar(
			"Qual o tipo de teste\n1-Eletrico\n2-Hidraulico\n3-Aerodinamico\n",
		);

		switch (Number(answer)) {
			case 1:
				testeTipo = TipoTeste.Eletrico;
				break;

			case 2:
				testeTipo = TipoTeste.Hidraulico;
				break;

			case 3:
				testeTipo = TipoTeste.Aerodinamico;
				break;

			default:
				console.log("Inválido");
				break;
		}
	}

	let testeResultado: ResultadoTeste | null = null;
	while (testeResultado === null) {
		const answer = await rl.perguntar(
			"Qual o resultado do teste\n1-Aprovado\n2-Reprovado\n",
		);

		switch (Number(answer)) {
			case 1:
				testeResultado = ResultadoTeste.Aprovado;
				break;

			case 2:
				testeResultado = ResultadoTeste.Reprovado;
				break;

			default:
				console.log("Inválido");
				break;
		}
	}

	const testeData = {
		id: testeId,
		tipo: testeTipo,
		resultado: testeResultado,
	};

	try {
		await tService.salvar(testeData);

		const teste = new Teste(testeData.id, testeData.tipo, testeData.resultado);
		context.aeronave.testes.push(teste);

		console.log("Cadastro bem sucedido...");
		await delay(2000);
		testeOpts(context);
	} catch (err) {
		console.error(err);
	}
}
