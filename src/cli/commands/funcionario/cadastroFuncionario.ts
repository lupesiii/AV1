import { Areas } from "../../../domain/enuns/Areas.js";
import { NivelPermissao } from "../../../domain/enuns/NivelPermissao.js";
import { FuncionarioRepository } from "../../../infra/FuncionarioRepository.js";
import { authService } from "../../../service/AuthService.js";
import { FuncionarioService } from "../../../service/FuncionarioService.js";
import type { Context } from "../../../types/context.js";
import { delay } from "../../../utils/delay.js";
import { rl } from "../../index.js";

export async function cadastroFuncionario(context: Context) {
	console.clear();
	console.log("------- Cadastro Funcionario -------");

	const fRepo = new FuncionarioRepository();
	const fService = new FuncionarioService(fRepo);

	if (!context.funcionario) {
		console.log("Falha critica");
		process.exit(1);
	}

	const usuario = context.funcionario;

	const auth = new authService();

	const permissaoValida = auth.verificaPermissao(usuario, Areas.Funcionario);

	if (!permissaoValida) {
		console.clear();
		console.error("Você não possui permissão");
		await delay(2000);
		return;
	}

	const userNome = await rl.perguntar("Digite o nome: ");
	const userTelefone = await rl.perguntar("Digite o telefone: ");
	const userEndereco = await rl.perguntar("Digite o endereco: ");
	const userName = await rl.perguntar("Digite o usuário: ");
	const userSenha = await rl.perguntar("Digite a senha: ");

	let userNivel: NivelPermissao | null = null;
	while (userNivel === null) {
		const answer = await rl.perguntar(
			"Qual o nivel de acesso\n1-ADMIN\n2-Engenheiro\n3-Operador\n",
		);

		switch (Number(answer)) {
			case 1:
				userNivel = NivelPermissao.Administrador;
				break;

			case 2:
				userNivel = NivelPermissao.Engenheiro;
				break;

			case 3:
				userNivel = NivelPermissao.Operador;
				break;

			default:
				console.log("Inválido");
				break;
		}
	}

	const funcionarioData = {
		nome: userNome,
		telefone: userTelefone,
		endereco: userEndereco,
		usuario: userName,
		senha: userSenha,
		nivelPermissao: userNivel,
	};

	try {
		await fService.salvar(funcionarioData);
		console.log("Cadastro bem sucedido...");
		await delay(2000);
	} catch (err) {
		console.error(err);
	}
}
