import path from "node:path";
import type { ResultadoTeste } from "../types/ResultadoTeste.js";
import type { TipoTeste } from "../types/TipoTeste.js";
import { Persistencia } from "./Persistencia.js";

export class Teste extends Persistencia {
	public tipo: TipoTeste;
	public resultado: ResultadoTeste;
	constructor(tipo: TipoTeste, resultado: ResultadoTeste) {
		super();
		this.tipo = tipo;
		this.resultado = resultado;
	}

	public async salvar() {
		const data = new Date();
		const fileName = `${this.tipo} - ${data.getDate()}${data.getMilliseconds()}.json`;
		const pathFile = path.join("dados", "teste");

		const dados = {
			tipo: this.tipo,
			resultado: this.resultado,
		};

		await this.criarJson(pathFile, fileName, dados);
	}
}
