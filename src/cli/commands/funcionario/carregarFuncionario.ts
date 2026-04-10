import type { Context } from "node:vm";
import { Funcionario } from "../../../domain/entities/Funcionario.js";
import { Areas } from "../../../domain/enuns/Areas.js";
import { FuncionarioRepository } from "../../../infra/FuncionarioRepository.js";
import { authService } from "../../../service/AuthService.js";
import { FuncionarioService } from "../../../service/FuncionarioService.js";
import { delay } from "../../../utils/delay.js";
import { rl } from "../../index.js";
import { funcionarioOpts } from "./funcionarioOpcoes.js";

export async function carregarFuncionario(context: Context) {
	const auth = new authService();
	console.clear();
	console.log("------- Carregando Funcionario -------");

	const fRepo = new FuncionarioRepository();
	const fService = new FuncionarioService(fRepo);

	if (!context.funcionario) {
		console.log("Falha critica");
		process.exit(1);
	}

	const permissaoValida = auth.verificaPermissao(
		context.funcionario,
		Areas.Funcionario,
	);

	if (!permissaoValida) {
		console.clear();
		console.error("Você não possui permissão");
		await delay(2000);
		return;
	}

	const userName = await rl.perguntar("Qual o usuario: ");

	if (context.funcionario?.usuario === userName) {
		console.log("Funcionário já carregado");
		await delay(2000);
		return;
	}

	const funcionarioCarregado = await fService.carregar(userName);

	if (!(funcionarioCarregado instanceof Funcionario)) {
		await delay(2000);
		return;
	}

	const userSenha = await rl.perguntar("Qual a senha: ");

	if (funcionarioCarregado.senha !== userSenha) {
		console.log("Senha incorreta do funcionario");
		return;
	}

	context.funcionario = funcionarioCarregado;
	await funcionarioOpts(context);
	return;
}
