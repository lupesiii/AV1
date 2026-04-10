import { Funcionario } from "../domain/entities/Funcionario.js";
import type { NivelPermissao } from "../domain/enuns/NivelPermissao.js";
import type { FuncionarioRepository } from "../infra/FuncionarioRepository.js";

interface salvarData {
  nome: string;
  telefone: string;
  endereco: string;
  usuario: string;
  senha: string;
  nivelPermissao: NivelPermissao;
}

export class FuncionarioService {
  constructor(private repo: FuncionarioRepository) { }

  async autenticar(usuario: string, senha: string) {
    const func = await this.repo.carregar(usuario);

    if (!func) return null;

    return func.autenticar(usuario, senha);
  }

  async salvar(data: salvarData) {
    const funcionario = new Funcionario(data.nome,
      data.telefone,
      data.endereco,
      data.usuario,
      data.senha,
      data.nivelPermissao,)

    await this.repo.salvar(funcionario)
  }

  async carregar(usuario: string) {
    const usuarioCarregado = await this.repo.carregar(usuario)

    if (!usuarioCarregado) return null

    const funcionario = new Funcionario(usuarioCarregado.nome,
      usuarioCarregado.telefone,
      usuarioCarregado.endereco,
      usuarioCarregado.usuario,
      usuarioCarregado.senha,
      usuarioCarregado.nivelPermissao,)

    return funcionario
  }
}
