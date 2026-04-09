import { Funcionario } from "../../domain/entities/Funcionario.js";
import { NivelPermissao } from "../../domain/enuns/NivelPermissao.js";
import { FuncionarioRepository } from "../../infra/FuncionarioRepository.js";
import { FuncionarioService } from "../../service/funcionarioService.js";
import type { Question } from "../../service/question.js";
import type { Context } from "../../types/context.js";
import { rl } from "../index.js";
import { cadastroFuncionario } from "./cadastroFuncionario.js";
import { geralOpts } from "./geralOpcoes.js";

export async function funcionarioOpts(context: Context) {
    const fRepo = new FuncionarioRepository()
    const fService = new FuncionarioService(fRepo)
    let funcionarioAtual = context.funcionario


    const options = `-------- Funcionario --------\n
1 - Cadastrar funcionário\n
2 - Carregar funcionário\n
0 - Voltar
-----------------------------\n\n`;

    let optAnswer: number | null = null;
    while (optAnswer !== 0) {
        // console.clear();
        optAnswer = Number(await rl.perguntar(options));
        switch (optAnswer) {
            case 1:
                await cadastroFuncionario(context);
                break;

            case 2: {
                console.clear();
                const userName = await rl.perguntar("Qual o usuario: ")

                if (funcionarioAtual?.usuario === userName) {
                    console.log("Funcionário já carregado");
                    break;
                }

                let funcionarioCarregado = new Funcionario(
                    "",
                    "",
                    "",
                    userName,
                    "",
                    NivelPermissao.Operador,
                );

                const dados = await fService.carregar(userName);

                if (!(dados instanceof Funcionario)) {
                    console.log("ERRO ARQUIVO NÃO ENCONTRADO")
                    funcionarioOpts(context)
                    break
                }

                funcionarioCarregado = dados

                const userSenha = await rl.perguntar("Qual a senha: ");

                if (funcionarioCarregado.senha !== userSenha) {
                    console.log("Senha incorreta do funcionario");
                    break;
                }

                funcionarioAtual = funcionarioCarregado;
                geralOpts(context);
                break;
            }

            case 0:
                geralOpts(context);
                break;

            default:
                console.log("Invalido");
                break;
        }
    }
}