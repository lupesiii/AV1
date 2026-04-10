import { Areas } from "../../../domain/enuns/Areas.js";
import { authService } from "../../../service/AuthService.js";
import type { Context } from "../../../types/context.js";
import { delay } from "../../../utils/delay.js";
import { etapaFind } from "../../../utils/etapaFind.js";
import { rl } from "../../index.js";

export async function listrFuncionarios(context: Context) {
	console.clear();
	console.log("------- Listar Funcionarios -------");

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

	const funcionarios = etapa.listarFuncionarios();
	console.clear();
	console.log("------- Lista Funcionarios -------");
	console.log(funcionarios);
	await rl.perguntar("Pressione uma Tecla para continuar...");
}
