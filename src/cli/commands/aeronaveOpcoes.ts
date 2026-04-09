import type { Question } from "../../service/question.js";
import { rl } from "../index.js";

async function aeronaveOpts() {
    const options = `-------- Aeronave ----------\n
1 - Cadastrar aeronave\n
2 - Carregar aeronave\n
----------------------------\n\n`;

    let optAnswer: number | null = null;
    
    while(optAnswer !== 0){
        optAnswer = Number(rl.perguntar(options))

        switch(optAnswer) {
            case 1:

        }
    }
}