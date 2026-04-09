import { randomUUID } from "node:crypto";
import type { NivelPermissao } from "../enuns/NivelPermissao.js";

export class Funcionario { 
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
}
