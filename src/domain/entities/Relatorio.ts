import type { ResultadoTeste } from "../enuns/ResultadoTeste.js";
import type { StatusEtapa } from "../enuns/StatusEtapa.js";
import type { StatusPeca } from "../enuns/StatusPeca.js";
import type { TipoAeronave } from "../enuns/TipoAeronave.js";
import type { TipoPeca } from "../enuns/TipoPeca.js";
import type { TipoTeste } from "../enuns/TipoTeste.js";
import type { Aeronave } from "./Aeronave.js";

interface IPecas {
	Nome: string;
	Tipo: TipoPeca;
	Fornecedor: string;
	Status: StatusPeca;
}

interface IEtapas {
	Etapa: string;
	Prazo: string;
	Status: StatusEtapa;
}

interface ITestes {
	ID: string;
	Tipo: TipoTeste;
	Resultado: ResultadoTeste;
}

interface IRelatorio {
	Aeronave: string;
	Modelo: string;
	Tipo: TipoAeronave;
	Capacidade: number;
	Alcance: number;
	Pecas: IPecas[];
	Etapas: IEtapas[];
	Testes: ITestes[];
}

export class Relatorio {
	public aeronave: Aeronave;

	constructor(aeronave: Aeronave) {
		this.aeronave = aeronave;
	}

	public gerarRelatorio() {
		const relatorio: IRelatorio = {
			Aeronave: this.aeronave.codigo,
			Modelo: this.aeronave.modelo,
			Tipo: this.aeronave.tipo,
			Capacidade: this.aeronave.capacidade,
			Alcance: this.aeronave.alcance,
			Pecas: [],
			Etapas: [],
			Testes: [],
		};

		this.aeronave.pecas.forEach((peca) => {
			relatorio.Pecas.push({
				Nome: peca.nome,
				Tipo: peca.tipo,
				Fornecedor: peca.fornecedor,
				Status: peca.status,
			});
		});

		this.aeronave.etapas.forEach((etapa) => {
			relatorio.Etapas.push({
				Etapa: etapa.nome,
				Prazo: etapa.prazo,
				Status: etapa.status,
			});
		});

		this.aeronave.testes.forEach((teste) => {
			relatorio.Testes.push({
				ID: teste.id,
				Tipo: teste.tipo,
				Resultado: teste.resultado,
			});
		});

		return relatorio;
	}
}
