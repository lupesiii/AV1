import { createInterface } from "node:readline";
import type { Context } from "node:vm";
import type { Funcionario } from "../domain/entities/Funcionario.js";
import { Question } from "../service/Question.js";
import { geralOpts } from "./commands/geralOpcoes.js";
import { login } from "./commands/login.js";

const readline = createInterface({
	input: process.stdin,
	output: process.stdout,
});

readline.on("SIGINT", () => {
	console.clear();
	console.log("\nVocê pressionou Ctrl + C!");
	readline.close();
});

readline.on("close", () => {
	readline.close();
	process.exit(0);
});

export const rl = new Question(readline);
export async function cliMain() {
	let funcionarioAtual: Funcionario | null = null;
	while (!funcionarioAtual) funcionarioAtual = await login();

	const context: Context = {
		funcionario: funcionarioAtual,
	};

	geralOpts(context);
}
