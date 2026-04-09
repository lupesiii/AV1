import { randomUUID } from "node:crypto";
import path from "node:path";
import type { NivelPermissao } from "../types/NivelPermissao.js";
import { Persistencia } from "./Persistencia.js";
import type { IPersistivel } from "../types/IPersistivel.js";

export class Funcionario extends Persistencia implements IPersistivel{
	public id: string;
	public nome: string;
	public telefone: string;
	public endereco: string;
	public usuario: string;
	public senha: string;
	public nivelPermissao: NivelPermissao;

	constructor(
		nome: string,
		telefone: string,
		endereco: string,
		usuario: string,
		senha: string,
		nivelPermissao: NivelPermissao,
	) {
		super();
		this.id = randomUUID();
		this.nome = nome;
		this.telefone = telefone;
		this.endereco = endereco;
		this.usuario = usuario;
		this.senha = senha;
		this.nivelPermissao = nivelPermissao;
	}

	public autenticar(usuario: string, senha: string): boolean {
		if (this.usuario === usuario || this.senha === senha) return true;
		return false;
	}

	public async salvar() {
		const fileName = `${this.usuario.toLowerCase()}.json`;
		const pathFile = path.join("dados", "funcionario");
		const dados = {
			nome: this.nome,
			telefone: this.telefone,
			endereco: this.endereco,
			usuario: this.usuario,
			senha: this.senha,
			nivelPermissao: this.nivelPermissao,
		};

		await this.criarJson(pathFile, fileName, dados);
	}

	public async carregar<Funcionario>() {
		const fileName = `${this.usuario.toLowerCase()}.json`;
		const pathFile = path.join("dados", "funcionario", fileName);

		const dados: Funcionario | null = await this.leJson<Funcionario>(pathFile);

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
