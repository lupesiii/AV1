import type { Aeronave } from "../domain/entities/Aeronave.js";
import type { Etapa } from "../domain/entities/Etapa.js";
import type { Funcionario } from "../domain/entities/Funcionario.js";
import type { Peca } from "../domain/entities/Peca.js";
import type { Teste } from "../domain/entities/Teste.js";

export interface Context {
    funcionario?: Funcionario,
    aeronave?: Aeronave,
    peca?: Peca
    etapa?: Etapa
    teste?: Teste
}