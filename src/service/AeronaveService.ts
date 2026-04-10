import { Aeronave } from "../domain/entities/Aeronave.js";
import type { TipoAeronave } from "../domain/enuns/TipoAeronave.js";
import type { AeronaveRepository } from "../infra/AeronaveRepository.js";

interface salvarData {
	codigo: string;
	modelo: string;
	tipo: TipoAeronave;
	capacidade: number;
	alcance: number;
}

export class AeronaveService {
	constructor(private repo: AeronaveRepository) {}

	async salvar(data: salvarData) {
		const aeronave = new Aeronave(
			data.codigo,
			data.modelo,
			data.tipo,
			data.capacidade,
			data.alcance,
		);

		await this.repo.salvar(aeronave);
	}

	async carregar(codigo: string) {
		const aeronaveCarregada = await this.repo.carregar(codigo);

		if (!aeronaveCarregada) return null;

		const aeronave = new Aeronave(
			aeronaveCarregada.codigo,
			aeronaveCarregada.modelo,
			aeronaveCarregada.tipo,
			aeronaveCarregada.capacidade,
			aeronaveCarregada.alcance,
		);

		return aeronave;
	}
}
