import { Peca } from "../domain/entities/Peca.js";
import type { StatusPeca } from "../domain/enuns/StatusPeca.js";
import type { TipoPeca } from "../domain/enuns/TipoPeca.js";
import type { PecaRepository } from "../infra/PecaRepository.js";

interface salvarData {
	nome: string;
	tipo: TipoPeca;
	fornecedor: string;
	status: StatusPeca;
}

export class PecaService {
	constructor(private repo: PecaRepository) {}

	public async salvar(data: salvarData) {
		const peca = new Peca(data.nome, data.tipo, data.fornecedor, data.status);

		await this.repo.salvar(peca);
	}

	async carregar(nome: string) {
		const pecaCarregado = await this.repo.carregar(nome);

		if (!pecaCarregado) return null;

		const peca = new Peca(
			pecaCarregado.nome,
			pecaCarregado.tipo,
			pecaCarregado.fornecedor,
			pecaCarregado.status,
		);

		return peca;
	}
}
