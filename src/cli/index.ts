import { createInterface } from "node:readline";
import { Question } from "../service/question.js";
import type { Funcionario } from "../domain/entities/Funcionario.js";
import { authService } from "../service/authService.js";
import { login } from "./commands/login.js";
import type { Context } from "node:vm";
import { geralOpts } from "./commands/geralOpcoes.js";

const readline = createInterface({ input: process.stdin, output: process.stdout });
export const rl = new Question(readline)

let funcionarioAtual: Funcionario | null = null;


while (!funcionarioAtual) funcionarioAtual = await login();

const context: Context = {
    funcionario: funcionarioAtual
}

geralOpts(context)