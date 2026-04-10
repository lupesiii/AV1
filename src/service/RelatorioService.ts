import type { Aeronave } from "../domain/entities/Aeronave.js";
import { Relatorio } from "../domain/entities/Relatorio.js";
import type { RelatorioRepository } from "../infra/RelatorioRepository.js";

export class RelatorioService {
	constructor(private repo: RelatorioRepository) {}

	public async salvar(aeronave: Aeronave) {
		const relatorio = new Relatorio(aeronave);

		await this.repo.salvar(relatorio);
	}
}
