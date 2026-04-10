import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { Funcionario } from "../domain/entities/Funcionario.js";
import { Areas } from "../domain/enuns/Areas.js";
import { NivelPermissao } from "../domain/enuns/NivelPermissao.js";
import { FuncionarioRepository } from "../infra/FuncionarioRepository.js";
import { FuncionarioService } from "./FuncionarioService.js";

export class authService {
	public verificaPermissao(usuario: Funcionario, areaFuncao: Areas) {
		if (!usuario) {
			console.error("SEM CADASTRO");
			process.exit(1);
		}

		if (usuario.nivelPermissao === NivelPermissao.Administrador) return true;

		if (areaFuncao === Areas.Teste || areaFuncao === Areas.Etapa) {
			if (usuario.nivelPermissao === NivelPermissao.Operador) return false;
		}

		return true;
	}

	public async login(usuario: string, senha: string) {
		const fRepo = new FuncionarioRepository();
		const fService = new FuncionarioService(fRepo);

		const fileName = `${usuario.toLowerCase()}.json`;
		const pathUser = path.join("dados", "funcionario", fileName);

		if (!existsSync(pathUser)) {
			console.clear();
			console.log("Usario não existente");
			return null;
		}

		const data: Funcionario = JSON.parse(
			await readFile(pathUser, { encoding: "utf-8" }),
		);

		const funcionario = new Funcionario(
			data.nome,
			data.telefone,
			data.endereco,
			data.usuario,
			data.senha,
			data.nivelPermissao,
		);

		const autenticado = await fService.autenticar(usuario, senha);

		if (!autenticado) {
			console.log("Senha Incorreta");
			return null;
		}

		return funcionario;
	}
}
