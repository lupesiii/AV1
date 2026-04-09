import { StatusEtapa } from "../types/StatusEtapa.js";
import type { Funcionario } from "./Funcionario.js";

export class Etapa {
	public nome: string;
	public prazo: string;
	public status: StatusEtapa;
	public funcionarios: Funcionario[];

	constructor(nome: string, prazo: string, funcionarios: Funcionario[]) {
		this.nome = nome;
		this.prazo = prazo;
		this.status = StatusEtapa.Pendente;
		this.funcionarios = funcionarios;
	}

	public iniciar() {
		this.status = StatusEtapa.Andamento;
	}

	public finalizar() {
		this.status = StatusEtapa.Concluida;
	}

	public associarFuncionario(func: Funcionario) {
		this.funcionarios.push(func);
	}

	public listarFuncionarios(): Funcionario[] {
		return this.funcionarios;
	}
}
