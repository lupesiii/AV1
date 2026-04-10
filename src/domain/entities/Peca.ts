import type { StatusPeca } from "../enuns/StatusPeca.js";
import type { TipoPeca } from "../enuns/TipoPeca.js";

export class Peca {
	public nome: string;
	public tipo: TipoPeca;
	public fornecedor: string;
	public status: StatusPeca;

	constructor(
		nome: string,
		tipo: TipoPeca,
		fornecedor: string,
		status: StatusPeca,
	) {
		this.nome = nome;
		this.tipo = tipo;
		this.fornecedor = fornecedor;
		this.status = status;
	}

	public atualizarStatus(novoStatus: StatusPeca) {
		this.status = novoStatus;
	}
}
