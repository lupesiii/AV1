import path from "node:path";
import type { Relatorio } from "../domain/entities/Relatorio.js";
import { Persistencia } from "./Persistencia.js";

export class RelatorioRepository extends Persistencia<Relatorio> {
	public async salvar(classe: Relatorio): Promise<void> {
		const fileName = `Relatório - ${classe.aeronave.codigo}.json`;
		const pathFile = path.join("dados", "relatorio");

		const relatorio = classe.gerarRelatorio();

		await this.criarJson(pathFile, fileName, relatorio);
	}
}
