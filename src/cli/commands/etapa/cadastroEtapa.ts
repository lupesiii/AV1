import { Etapa } from "../../../domain/entities/Etapa.js";
import { Areas } from "../../../domain/enuns/Areas.js";
import { authService } from "../../../service/AuthService.js";
import type { Context } from "../../../types/context.js";
import { delay } from "../../../utils/delay.js";
import { rl } from "../../index.js";
import { etapaOpts } from "./etapaOpcoes.js";

export async function cadastroEtapa(context: Context) {
	console.clear();
	console.log("------- Cadastro Etapa -------");

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

	const etapaExiste = context.aeronave.etapas.some(
		(etapa) => etapa.nome === etapaNome,
	);

	if (etapaExiste) {
		console.clear();
		console.error("Etapa já cadastrada");
		await delay(2000);
		return;
	}

	const etapaPrazo = await rl.perguntar("Digite o prazo da etapa: ");

	const etapaData = {
		nome: etapaNome,
		prazo: etapaPrazo,
	};

	const etapa = new Etapa(etapaData.nome, etapaData.prazo);

	context.aeronave.etapas.push(etapa);
	console.log("Etapa Criada e atribuida");
	await delay(1000);
	etapaOpts(context);
}
