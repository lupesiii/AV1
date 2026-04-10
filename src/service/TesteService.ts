import { Teste } from "../domain/entities/Teste.js";
import type { ResultadoTeste } from "../domain/enuns/ResultadoTeste.js";
import type { TipoTeste } from "../domain/enuns/TipoTeste.js";
import type { TesteRepository } from "../infra/TesteRepository.js";

interface salvarData {
	id: string;
	tipo: TipoTeste;
	resultado: ResultadoTeste;
}

export class TesteService {
	constructor(private repo: TesteRepository) {}

	async salvar(data: salvarData) {
		const teste = new Teste(data.id, data.tipo, data.resultado);

		await this.repo.salvar(teste);
	}

	async carregar(id: string) {
		const testeCarregado = await this.repo.carregar(id);

		if (!testeCarregado) return null;

		const teste = new Teste(
			testeCarregado.id,
			testeCarregado.tipo,
			testeCarregado.resultado,
		);

		return teste;
	}
}
