# Executar projeto

O projeto já vem com algumas arquivos pré-prontos. Para adiciona-los, com o projeto executando selecione a opção referente ao objeto/arquivo e depois selecione carregar e por ultimo o nome do arquivo

## Requisitos

- Node 24.1.0
- Typescript

## Comandos

- npm i
- npm run dev

# 🧱 Arquitetura do Projeto CLI com POO (TypeScript)

## 📌 Visão Geral

Este projeto segue uma arquitetura em camadas para aplicações CLI utilizando **Programação Orientada a Objetos (POO)** com TypeScript.

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
│
└── types/              # Tipos globais
```

---

## 🧠 Arquitetura em Camadas

O sistema é dividido em 4 camadas principais:

### 1. CLI (Interface)

Responsável pela interação com o usuário.

**Responsabilidades:**

- Ler entrada do usuário (`readline`, prompts)
- Exibir mensagens (`console.log`)
- Chamar os services

**Não deve:**

- Conter regras de negócio
- Acessar arquivos diretamente
- Criar entidades complexas

**Exemplo:**

```ts
await funcionarioService.criar({ ...dados });
```

---

### 2. Domain (Domínio)

Representa o núcleo do sistema.

**Contém:**

- Entidades (ex: `Funcionario`)
- Interfaces (ex: `IPersistivel`)
- Enums (ex: `NivelPermissao`)

**Responsabilidades:**

- Regras de negócio
- Comportamento das entidades

**Não deve:**

- Depender de `fs`, `path`, banco de dados ou CLI

---

### 3. Services (Aplicação)

Orquestram o fluxo da aplicação.

**Responsabilidades:**

- Receber dados do CLI
- Criar entidades
- Chamar repositórios
- Aplicar regras de aplicação

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

- Repositórios
- Persistência em JSON (ou banco futuramente)

**Responsabilidades:**

- Salvar dados
- Ler dados
- Gerenciar arquivos/pastas

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

## 📌 Conclusão

Essa arquitetura garante que o sistema seja:

- Organizado
- Escalável
- Fácil de manter
- Preparado para crescimento
