import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createInterface } from "node:readline/promises";
import { Etapa } from "./entidades/Etapa.js";
import { Funcionario } from "./entidades/Funcionario.js";
import { Persistencia } from "./entidades/Persistencia.js";
import { Teste } from "./entidades/Teste.js";
import { Areas } from "./types/Areas.js";
import { NivelPermissao } from "./types/NivelPermissao.js";

async function main() {
	const rl = createInterface({ input: process.stdin, output: process.stdout });
	const func = new Funcionario(
		"Lucas",
		"12981438361",
		"Vila Industrial",
		"lupesi",
		"1",
		NivelPermissao.Administrador,
	);

	let funcionarioAtual: Funcionario | null = null;

	while (!funcionarioAtual) funcionarioAtual = await login();

	function verificaPermissao(funcionario: Funcionario, areaFuncao: Areas) {
		if (funcionario.nivelPermissao === NivelPermissao.Administrador)
			return true;

		if (areaFuncao === Areas.Teste || areaFuncao === Areas.Etapa) {
			if (funcionario.nivelPermissao === NivelPermissao.Operador) return false;
			return true;
		}

		return false;
	}

	async function cadastro() {
		console.clear();

		if (!funcionarioAtual) {
			console.error("SEM CADASTRO");
			process.exit(1);
		}

		const permissaoValida = verificaPermissao(
			funcionarioAtual,
			Areas.Funcionario,
		);

		if (!permissaoValida) {
			console.error("Você não possui permissão");
			return;
		}

		const userNome = await rl.question("Digite o nome: ");
		const userTelefone = await rl.question("Digite o telefone: ");
		const userEndereco = await rl.question("Digite o endereco: ");
		const userName = await rl.question("Digite o usuário: ");
		const userSenha = await rl.question("Digite a senha: ");

		let userNivel: NivelPermissao | null = null;
		while (userNivel === null) {
			console.clear();
			const answer = await rl.question(
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

		const fileName = `${userName.toLowerCase()}.json`;
		const pathFile = path.join("dados", "funcionario", fileName);

		if (existsSync(pathFile)) {
			console.clear();
			console.log("Usuário já cadastrado");
			return;
		}

		const newFuncionario = new Funcionario(
			userNome,
			userTelefone,
			userEndereco,
			userName,
			userSenha,
			NivelPermissao.Operador,
		);

		await newFuncionario.salvar();
	}

	async function login() {
		const userName = await rl.question("Digite o usuário: ");
		const userSenha = await rl.question("Digite a senha: ");

		const fileName = `${userName.toLowerCase()}.json`;
		const pathUser = path.join("dados", "funcionario", fileName);

		if (!existsSync(pathUser)) {
			console.clear();
			console.log("Usario não existente");
			return null;
		}

		const {
			nome,
			telefone,
			endereco,
			usuario,
			senha,
			nivelPermissao,
		}: Funcionario = JSON.parse(
			await readFile(pathUser, { encoding: "utf-8" }),
		);
		const funcionario = new Funcionario(
			nome,
			telefone,
			endereco,
			usuario,
			senha,
			nivelPermissao,
		);

		const auth = funcionario.autenticar(userName, userSenha);

		if (auth) {
			return funcionario;
		}
		console.log("Senha Incorreta");
		return null;
	}

	async function funcionarioOpts() {
		const options = `-------- Funcionario --------\n
1 - Cadastrar funcionário\n
2 - Carregar funcionário\n
0 - Voltar
-----------------------------\n\n`;

		let optAnswer: number | null = null;
		while (optAnswer !== 0) {
			console.clear();
			optAnswer = Number(await rl.question(options));
			switch (optAnswer) {
				case 1:
					await cadastro();
					break;

				case 2: {
					console.clear();
					const userName = await rl.question("Qual o usuario: ");
					const userSenha = await rl.question("Qual a senha: ");

					if (funcionarioAtual?.usuario === userName) {
						console.log("Funcionário já carregado");
						break;
					}

					let funcionarioCarregado = new Funcionario(
						"",
						"",
						"",
						userName,
						userSenha,
						NivelPermissao.Operador,
					);

					funcionarioCarregado = await funcionarioCarregado.carregar();

					if (funcionarioCarregado.senha !== userSenha) {
						console.log("Senha incorreta do funcionario");
						break;
					}

					funcionarioAtual = funcionarioCarregado;
					geralOpts();
					break;
				}

				case 0:
					geralOpts();
					break;

				default:
					console.log("Invalido");
					break;
			}
		}
	}

	async function aeronaveOpts() {
		const options = `-------- Aeronave ----------\n
1 - Cadastrar aeronave\n
2 - Carregar aeronave\n
----------------------------\n\n`;

		const optAnswer = rl.question(options);
	}

	async function etapaOpts() {
		const options = `-------- Etapas --------\n
1 - Adicionar Etapa\n
2 - Iniciar etapa\n
3 - Finalizar etapa\n
4 - Associar funcionario\n
5 - Listar funcionários\n
------------------------\n\n`;

		const optAnswer = rl.question(options);
	}

	async function pecaOpts() {
		const options = `-------- Peça --------\n
1 - Cadastrar e associar peça\n
2 - Carregar peça\n
3 - Atualizar status\n
----------------------\n\n`;

		const optAnswer = rl.question(options);
	}

	async function testeOpts() {
		const options = `-------- Teste --------\n
1 - Cadastrar e Adicionar Teste\n
2 - Carregar Teste\n
-----------------------\n\n`;

		const optAnswer = rl.question(options);
	}

	async function relatorioOpts() {
		const options = `----- RELATORIO -----\n
1 - Gerar Relatorio\n
2 - Salvar Relatorio em Arquivo\n
-----------------------\n\n`;

		const optAnswer = rl.question(options);
	}

	async function geralOpts() {
		console.clear();
		const optionsGerais = `Bem vindo, o que você deseja?\n
1 - Vizualizar opções dos Funcionários
2 - Vizualizar opções das Peças
3 - Vizualizar opções das Etapas
4 - Vizualizar opções dos Testes
5 - Vizualizar opções da aeronave
6 - Vizualizar opções do relatório
0 - Sair\n`;

		let optionsAnswer: number | null = null;
		while (optionsAnswer !== 0) {
			optionsAnswer = Number(await rl.question(optionsGerais));
			switch (optionsAnswer) {
				case 1:
					funcionarioOpts();
					break;

				case 2:
					pecaOpts();
					break;

				case 3:
					etapaOpts();
					break;

				case 4:
					testeOpts();
					break;

				case 5:
					aeronaveOpts();
					break;

				case 6:
					relatorioOpts();
					break;

				case 0:
					console.log("Saindo...");
					rl.close();
					break;

				default:
					console.log("Invalido");
					break;
			}
			console.clear();
		}
	}

	geralOpts();
}

main();
