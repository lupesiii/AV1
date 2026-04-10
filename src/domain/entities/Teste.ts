import type { ResultadoTeste } from "../enuns/ResultadoTeste.js";
import type { TipoTeste } from "../enuns/TipoTeste.js";

export class Teste {
	public id: string;
	public tipo: TipoTeste;
	public resultado: ResultadoTeste;
	constructor(id: string, tipo: TipoTeste, resultado: ResultadoTeste) {
		this.id = id;
		this.tipo = tipo;
		this.resultado = resultado;
	}
}
