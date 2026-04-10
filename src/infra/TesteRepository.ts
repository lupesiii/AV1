import path from "node:path";
import { Teste } from "../domain/entities/Teste.js";
import { Persistencia } from "./Persistencia.js";
import type { Persistivel } from "./Persistivel.js";

export class TesteRepository
	extends Persistencia<Teste>
	implements Persistivel<Teste>
{
	public async salvar(teste: Teste) {
		const fileName = `${teste.id.toLowerCase()}.json`;
		const pathFile = path.join("dados", "teste");
		const dados = {
			id: teste.id,
			tipo: teste.tipo,
			resultado: teste.resultado,
		};

		await this.criarJson(pathFile, fileName, dados);
	}

	public async carregar(id: string) {
		const fileName = `${id.toLowerCase()}.json`;
		const pathFile = path.join("dados", "teste", fileName);

		const dados: Teste | null = await this.leJson(pathFile);

		if (dados === null) return null;

		const testeCarregada = new Teste(dados.id, dados.tipo, dados.resultado);

		return testeCarregada;
	}
}
