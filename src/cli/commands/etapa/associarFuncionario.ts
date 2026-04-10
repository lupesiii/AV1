import { Funcionario } from "../../../domain/entities/Funcionario.js";
import { Areas } from "../../../domain/enuns/Areas.js";
import { StatusEtapa } from "../../../domain/enuns/StatusEtapa.js";
import { FuncionarioRepository } from "../../../infra/FuncionarioRepository.js";
import { authService } from "../../../service/AuthService.js";
import { FuncionarioService } from "../../../service/FuncionarioService.js";
import type { Context } from "../../../types/context.js";
import { delay } from "../../../utils/delay.js";
import { etapaFind } from "../../../utils/etapaFind.js";
import { rl } from "../../index.js";
import { geralOpts } from "../geralOpcoes.js";
import { etapaOpts } from "./etapaOpcoes.js";

export async function associarFuncionario(context: Context) {
	console.clear();
	console.log("------- Associar Funcionarios -------");

	const fRepo = new FuncionarioRepository();
	const fService = new FuncionarioService(fRepo);

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

	const etapaNome = await rl.perguntar("Digite o nome da etapa: ");

	const etapa = await etapaFind(context.aeronave, etapaNome);

	if (!etapa) return;

	if (etapa.status === StatusEtapa.Concluida) {
		console.clear();
		console.log("Etapa já concluida");
		await delay(1000);
		return;
	}

	const userName = await rl.perguntar("Qual o usuario: ");

	const funcionario = await fService.carregar(userName);

	if (!(funcionario instanceof Funcionario)) {
		await delay(2000);
		return;
	}

	if (etapa.funcionarios.includes(funcionario)) {
		console.clear();
		console.log("Funcionário já associado");
		await delay(2000);
		return;
	}

	const etapaIndex = context.aeronave.etapas.indexOf(etapa);

	context.aeronave.etapas[etapaIndex]?.associarFuncionario(funcionario);
	console.log("Funcionário associado");
	await delay(1000);
	etapaOpts(context);
}
