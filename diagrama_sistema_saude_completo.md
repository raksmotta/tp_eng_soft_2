# Diagrama de Classes: Gestão de Atendimentos de Saúde

Este documento descreve a estrutura das classes para um sistema simples de gestão de atendimentos.

## Enums (Tipos Fixos)

* **CategoriaProfissional:** `MEDICO`, `PSICOLOGO`, `FISIOTERAPEUTA`
* **TipoReceita:** `REMEDIO`, `ATIVIDADE_FISICA`, `ATIVIDADE_MENTAL`

## Classes e Estruturas

### 1. ProfissionalDeSaude
* **Atributos:**
    * `id: Integer`
    * `nome: String`
    * `telefone: String`
    * `endereco: String`
    * `categoria: CategoriaProfissional`

* **Métodos:**
    * `inserir(): Boolean`
    * `alterar(id: Integer): Boolean`
    * `consultarPorNome(nome: String): ProfissionalDeSaude`
    * `consultarPorId(id: Integer): ProfissionalDeSaude`
    * `consultarPorCategoria(categoria: CategoriaProfissional): List<ProfissionalDeSaude>`
    * `excluir(id: Integer): Boolean`

### 2. Atendimento
* **Atributos:**
    * `id: Integer`
    * `data: Date`
    * `horario: Time`
    * `problemaTexto: String`
    * `receitaSaude: TipoReceita`
    * `profissionalId: Integer`(Foreign Key)

* **Métodos:**
    * `inserir(): Boolean`
    * `alterar(id: Integer): Boolean`
    * `consultarPorId(id: Integer): Atendimento`
    * `consultarPorData(data: Date): List<Atendimento>`
    * `consultarPorProfissional(profissionalId: Integer): List<Atendimento>`
    * `consultarPorReceita(receita: TipoReceita): List<Atendimento>`
    * `excluir(id: Integer): Boolean`

### 3. ExameLab
* **Atributos:**
    * `id: Integer`
    * `descricao: String`
    * `atendimentoId: Integer` (Foreign Key)

* **Métodos:**
    * `inserir(): Boolean`
    * `alterar(id: Integer): Boolean`
    * `consultarPorId(id: Integer): ExameLab`
    * `excluir(id: Integer): Boolean`
    Nota: Para esta classe, incluímos apenas o método consultarPorId. A lógica de negócio dita que a visualização de exames deve ocorrer exclusivamente através do contexto do atendimento vinculado no front-end, evitando consultas isoladas que perderiam o vínculo semântico com o histórico do paciente.

---

## Relacionamentos

* **ProfissionalDeSaude (1) --- (*) Atendimento:**
    * Um profissional pode realizar múltiplos atendimentos.
    * Um atendimento é realizado por exatamente um profissional.
* **Atendimento (1) --- (*) ExameLab:**
    * Um atendimento pode conter vários exames solicitados.
    * Cada exame pertence a um único atendimento.