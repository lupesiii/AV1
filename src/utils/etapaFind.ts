import type { Aeronave } from "../domain/entities/Aeronave.js";
import { delay } from "./delay.js";

export async function etapaFind(aeronave: Aeronave, etapaNome: string) {
	const etapa = aeronave.etapas.find((etapa) => etapa.nome === etapaNome);

	if (!etapa) {
		console.log("Nenhuma etapa encontrada");
		await delay(1000);
		return null;
	}

	return etapa;
}
