import type { Question } from "../../service/question.js";
import type { Context } from "../../types/context.js";
import { rl } from "../index.js";
import { funcionarioOpts } from "./funcionarioOpcoes.js";

export async function geralOpts(context: Context) {
    console.clear();
    const optionsGerais = `Bem vindo, o que você deseja?\n
1 - Vizualizar opções dos Funcionários
2 - Vizualizar opções das Peças
3 - Vizualizar opções das Etapas
4 - Vizualizar opções dos Testes
5 - Vizualizar opções da aeronave
6 - Vizualizar opções do relatório
0 - Sair\n`;

    let optionsAnswer: number | null = null;
    while (optionsAnswer !== 0) {
        optionsAnswer = Number(await rl.perguntar(optionsGerais));
        switch (optionsAnswer) {
            case 1:
               funcionarioOpts(context)
                break;

            case 2:
        
                break;

            case 3:
       
                break;

            case 4:
            
                break;

            case 5:
       
                break;

            case 6:
           
                break;

            case 0:
                console.log("Saindo...");
                rl.fechar();
                break;

            default:
                console.log("Invalido");
                break;
        }
        console.clear();
    }
}