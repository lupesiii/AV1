import path from "node:path";
import type { StatusPeca } from "../domain/enuns/StatusPeca.js";
import type { TipoPeca } from "../domain/enuns/TipoPeca.js";
import { Persistencia } from "./Persistencia.js";

export class Peca extends Persistencia<Peca> {
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
		super();
		this.nome = nome;
		this.tipo = tipo;
		this.fornecedor = fornecedor;
		this.status = status;
	}

	public atualizarStatus(novoStatus: StatusPeca) {
		this.status = novoStatus;
	}

	public async salvar() {
		const data = new Date();
		const fileName = `${this.nome} - ${data.getDate()}${data.getMilliseconds()}.json`;
		const pathFile = path.join("dados", "peca");

		const dados = {
			nome: this.nome,
			tipo: this.tipo,
			fornecedor: this.fornecedor,
			status: this.status,
		};

		await this.criarJson(pathFile, fileName, dados);
	}
}
