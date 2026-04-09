import type { Funcionario } from "../domain/entities/Funcionario.js";
import { Areas } from "../domain/enuns/Areas.js";
import { NivelPermissao } from "../domain/enuns/NivelPermissao.js";

export class authService {
    public verificaPermissao(usuario:Funcionario, areaFuncao: Areas) {
		if (!usuario) {
			console.error("SEM CADASTRO");
			process.exit(1);
		}

		if (usuario.nivelPermissao === NivelPermissao.Administrador)
			return true;

		if (areaFuncao === Areas.Teste || areaFuncao === Areas.Etapa) {
			if (usuario.nivelPermissao === NivelPermissao.Operador) return false;
			return true;
		}

		return false;
	}
}