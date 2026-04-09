import path from "node:path";
import { Aeronave } from "./Aeronave.js";
import { Persistencia } from "./Persistencia.js";

export class Relatorio extends Persistencia<Relatorio> {
	public aeronave: Aeronave

	constructor(aeronave: Aeronave) {
		super();
		this.aeronave = aeronave
	}

	public gerarRelatorio() {
		let relatorio = {
				Aeronave: this.aeronave.codigo,
				Modelo: this.aeronave.modelo,
				Tipo: this.aeronave.tipo,
				Capacidade: this.aeronave.capacidade,
				Alcance: this.aeronave.alcance,
				Pecas : {},
				Etapas: {},
				Testes: {},

		}

		if (this.aeronave.pecas.length === 0) relatorio.Pecas = { Erro: "Nenhuma peça cadastrado"}

		this.aeronave.pecas.forEach((peca) => {
			relatorio.Pecas = {Nome: peca.nome};
			relatorio.Pecas = {Tipo: peca.tipo};
			relatorio.Pecas = {Fornecedor: peca.fornecedor};
			relatorio.Pecas = {Status: peca.status};
		});

		if (this.aeronave.etapas.length === 0) relatorio.Etapas =  { Erro: "Nenhuma etapa cadastrado"}

		this.aeronave.etapas.forEach((etapa) => {
			relatorio.Etapas = {Etapa: etapa.nome}
			relatorio.Etapas = {Prazo: etapa.prazo}
			relatorio.Etapas = {Status: etapa.status}
		});

		if (this.aeronave.testes.length === 0) relatorio.Testes = {Erro: "Nenhum teste cadastrado"}

		this.aeronave.testes.forEach((teste) => {
			relatorio.Testes = {Tipo: teste.tipo}
			relatorio.Testes = {Resultado: teste.resultado}
		});

		return relatorio
	}

	public async salvarEmArquivo() {
		const date = new Date()
		const fileName = `Relatório aeronave ${this.aeronave.codigo} - ${date.getDate()}.json`
		const pathFile = path.join("dados", "relatorio")

		const relatorio = this.gerarRelatorio()

		await this.criarJson(pathFile, fileName, relatorio)
	}
}
