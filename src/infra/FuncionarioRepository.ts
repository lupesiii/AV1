import path from "node:path";
import { Funcionario } from "../domain/entities/Funcionario.js";
import { Persistencia } from "./Persistencia.js";

export class FuncionarioRepository extends Persistencia<Funcionario> {
    public async salvar(funcionario: Funcionario) {
		const fileName = `${funcionario.usuario.toLowerCase()}.json`;
		const pathFile = path.join("dados", "funcionario");
		const dados = {
			nome: funcionario.nome,
			telefone: funcionario.telefone,
			endereco: funcionario.endereco,
			usuario: funcionario.usuario,
			senha: funcionario.senha,
			nivelPermissao: funcionario.nivelPermissao,
		};

		await this.criarJson(pathFile, fileName, dados);
	}

	public async carregar(usuario: string) {
		const fileName = `${usuario.toLowerCase()}.json`;
		const pathFile = path.join("dados", "funcionario", fileName);

		const dados: Funcionario | null = await this.leJson(pathFile);

		if (dados === null) return null

		const funcionarioCarregado = new Funcionario(
			dados.nome,
			dados.telefone,
			dados.endereco,
			dados.usuario,
			dados.senha,
			dados.nivelPermissao,
		);

		return funcionarioCarregado;
	}
}