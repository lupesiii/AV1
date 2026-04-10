import path from "node:path";
import { Aeronave } from "../domain/entities/Aeronave.js";
import { Persistencia } from "./Persistencia.js";

export class AeronaveRepository extends Persistencia<Aeronave> {
	public async salvar(aeronave: Aeronave) {
		const fileName = `${aeronave.codigo.toLowerCase()}.json`;
		const pathFile = path.join("dados", "aeronave");
		const dados = {
			codigo: aeronave.codigo,
			modelo: aeronave.modelo,
			tipo: aeronave.tipo,
			capacidade: aeronave.capacidade,
			alcance: aeronave.alcance,
		};

		await this.criarJson(pathFile, fileName, dados);
	}

	public async carregar(codigo: string) {
		const fileName = `${codigo.toLowerCase()}.json`;
		const pathFile = path.join("dados", "aeronave", fileName);

		const dados: Aeronave | null = await this.leJson(pathFile);

		if (dados === null) return null;

		const aeronaveCarregada = new Aeronave(
			dados.codigo,
			dados.modelo,
			dados.tipo,
			dados.capacidade,
			dados.alcance,
		);

		return aeronaveCarregada;
	}
}
