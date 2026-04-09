import type { ReadLine } from "node:readline"

export class Question {
    constructor(private rl: ReadLine){}

    public async perguntar(pergunta: string) : Promise<string> {
        return new Promise (resolve => {
            this.rl.question(pergunta, resposta => resolve(resposta) )
        })
    }
}