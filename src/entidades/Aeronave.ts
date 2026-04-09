import path from "node:path";
import type { TipoAeronave } from "../types/TipoAeronave.js";
import type { Etapa } from "./Etapa.js";
import type { Peca } from "./Peca.js";
import { Persistencia } from "./Persistencia.js";
import { Relatorio } from "./Relatorio.js";
import type { Teste } from "./Teste.js";

export class Aeronave extends Persistencia {
	public codigo: string;
	public modelo: string;
	public tipo: TipoAeronave;
	public capacidade: number;
	public alcance: number;

	public pecas: Peca[];
	public etapas: Etapa[];
	public testes: Teste[];
	public relatorio: Relatorio;

	constructor(
		codigo: string,
		modelo: string,
		tipo: TipoAeronave,
		capacidade: number,
		alcance: number,
	) {
		super();
		this.codigo = codigo;
		this.modelo = modelo;
		this.tipo = tipo;
		this.capacidade = capacidade;
		this.alcance = alcance;
		this.pecas = [];
		this.etapas = [];
		this.testes = [];
		this.relatorio = new Relatorio(this);
	}

	public async salvar() {
		const fileName = `${this.codigo}-${this.modelo}.json`;
		const pathFile = path.join("dados", "aeronave");

		const dados = {
			codigo: this.codigo,
			modelo: this.modelo,
			tipo: this.tipo,
			capacidade: this.capacidade,
			alcance: this.alcance,
		};

		await this.criarJson(pathFile, fileName, dados);
	}
}
