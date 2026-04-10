import path from "node:path";
import { Peca } from "../domain/entities/Peca.js";
import { Persistencia } from "./Persistencia.js";
import type { Persistivel } from "./Persistivel.js";

export class PecaRepository
	extends Persistencia<Peca>
	implements Persistivel<Peca>
{
	public async salvar(peca: Peca) {
		const fileName = `${peca.nome}.json`;
		const pathFile = path.join("dados", "peca");
		const dados = {
			nome: peca.nome,
			tipo: peca.tipo,
			fornecedor: peca.fornecedor,
			status: peca.status,
		};

		await this.criarJson(pathFile, fileName, dados);
	}

	public async carregar(nome: string) {
		const fileName = `${nome.toLowerCase()}.json`;
		const pathFile = path.join("dados", "peca", fileName);

		const dados: Peca | null = await this.leJson(pathFile);

		if (dados === null) return null;

		const pecaCarregada = new Peca(
			dados.nome,
			dados.tipo,
			dados.fornecedor,
			dados.status,
		);

		return pecaCarregada;
	}
}
