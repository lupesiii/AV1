import { Aeronave } from "../../../domain/entities/Aeronave.js";
import { AeronaveRepository } from "../../../infra/AeronaveRepository.js";
import { AeronaveService } from "../../../service/AeronaveService.js";
import type { Context } from "../../../types/context.js";
import { delay } from "../../../utils/delay.js";
import { rl } from "../../index.js";
import { aeronaveOpts } from "./aeronaveOpcoes.js";

export async function carregarAeronave(context: Context) {
	console.clear();
	console.log("------- Carregando Aeronave -------");

	const aRepo = new AeronaveRepository();
	const aService = new AeronaveService(aRepo);

	if (!context.funcionario) {
		console.log("Falha critica");
		process.exit(1);
	}

	const aeroCodigo = await rl.perguntar("Qual o código: ");

	if (context.aeronave?.codigo === aeroCodigo) {
		console.log("Aeronave já carregada");
		await delay(2000);
		return;
	}

	const aeronaveCarregada = await aService.carregar(aeroCodigo);

	if (!(aeronaveCarregada instanceof Aeronave)) {
		await delay(2000);
		return;
	}

	context.aeronave = aeronaveCarregada;
	console.clear();
	console.log("Aeronave carregada");
	await delay(1000);
	await aeronaveOpts(context);
}
