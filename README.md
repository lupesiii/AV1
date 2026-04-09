# 🧱 Arquitetura do Projeto CLI com POO (TypeScript)

## 📌 Visão Geral

Este projeto segue uma arquitetura em camadas para aplicações CLI utilizando **Programação Orientada a Objetos (POO)** com TypeScript.

O objetivo é garantir:

* Separação de responsabilidades
* Código escalável
* Facilidade de manutenção
* Baixo acoplamento entre camadas

---

## 🗂️ Estrutura de Pastas

```
src/
│
├── cli/                # Interface com o usuário (entrada da aplicação)
│   ├── index.ts
│   ├── commands/
│
├── domain/             # Regras de negócio puras
│   ├── entities/
│   ├── enums/
│   └── interfaces/
│
├── services/           # Casos de uso (lógica da aplicação)
│
├── infra/              # Persistência e acesso a dados
│   └── persistencia/
│
├── utils/              # Funções utilitárias
│
├── config/             # Configurações do projeto
│
└── types/              # Tipos globais
```

---

## 🧠 Arquitetura em Camadas

O sistema é dividido em 4 camadas principais:

### 1. CLI (Interface)

Responsável pela interação com o usuário.

**Responsabilidades:**

* Ler entrada do usuário (`readline`, prompts)
* Exibir mensagens (`console.log`)
* Chamar os services

**Não deve:**

* Conter regras de negócio
* Acessar arquivos diretamente
* Criar entidades complexas

**Exemplo:**

```ts
await funcionarioService.criar({ ...dados });
```

---

### 2. Domain (Domínio)

Representa o núcleo do sistema.

**Contém:**

* Entidades (ex: `Funcionario`)
* Interfaces (ex: `IPersistivel`)
* Enums (ex: `NivelPermissao`)

**Responsabilidades:**

* Regras de negócio
* Comportamento das entidades

**Não deve:**

* Depender de `fs`, `path`, banco de dados ou CLI

---

### 3. Services (Aplicação)

Orquestram o fluxo da aplicação.

**Responsabilidades:**

* Receber dados do CLI
* Criar entidades
* Chamar repositórios
* Aplicar regras de aplicação

**Exemplo:**

```ts
class FuncionarioService {
  async criar(dados) {
    const funcionario = new Funcionario(...);
    await repo.salvar(funcionario);
  }
}
```

---

### 4. Infra (Infraestrutura)

Responsável pelo acesso a dados.

**Contém:**

* Repositórios
* Persistência em JSON (ou banco futuramente)

**Responsabilidades:**

* Salvar dados
* Ler dados
* Gerenciar arquivos/pastas

---

## 🔄 Fluxo da Aplicação

```
Usuário → CLI → Service → Repository → Arquivo JSON
```

Ou:

```
CLI → Service → Domain → Infra
```

---

## 🧩 Exemplo de Fluxo (Cadastro)

1. Usuário digita dados no CLI
2. CLI envia dados para `FuncionarioService`
3. Service cria uma instância de `Funcionario`
4. Service chama o `Repository`
5. Repository salva em JSON

---

## ⚠️ Boas Práticas

### ❌ Evitar

* Entidades acessando arquivos (`fs`)
* CLI contendo lógica de negócio
* Métodos genéricos desnecessários (`<T>` mal utilizado)

---

## 🔧 Evolução do Projeto

Essa arquitetura permite evoluir facilmente:

* 🔄 Trocar JSON por banco de dados
* 🌐 Adaptar CLI para API REST
* 🧪 Adicionar testes unitários
* 🔐 Implementar autenticação robusta

---

## 📌 Conclusão

Essa arquitetura garante que o sistema seja:

* Organizado
* Escalável
* Fácil de manter
* Preparado para crescimento

