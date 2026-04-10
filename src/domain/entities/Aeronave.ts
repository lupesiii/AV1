import type { TipoAeronave } from "../enuns/TipoAeronave.js";
import type { Etapa } from "./Etapa.js";
import type { Peca } from "./Peca.js";
import { Relatorio } from "./Relatorio.js";
import type { Teste } from "./Teste.js";

export class Aeronave {
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

	public detalhes() {
		console.log("===== AERONAVE =====");
		console.log("Código:", this.codigo);
		console.log("Modelo:", this.modelo);
		console.log("Tipo:", this.tipo);
		console.log("Capacidade:", this.capacidade);
		console.log("Alcance:", this.alcance);
	}
}
