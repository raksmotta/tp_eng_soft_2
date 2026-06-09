# Diagrama de Classes: Gestão de Atendimentos de Saúde

Este documento descreve a estrutura das classes apresentadas no diagrama de requisitos para um sistema de gestão de atendimentos.

## Classes e Estruturas

### 1. profissional_de_saude
Representa os profissionais cadastrados no sistema.

* **Atributos:**
    * `id`
    * `nome`
    * `telefone`
    * `endereço`
    * `categoria []` (Lista de categorias que pode conter os seguintes tipos de profissionais: "Psicólogo", "Fisioterapeuta", "Médico")

* **Métodos (CRUD):**
    * `Inserir()`
    * `Alterar(id)`
    * `Consultar(nome)`
    * `Consultar(id)`
    * `Consultar(categoria)`
    * `Excluir(id)`

### 2. atendimento
Representa um registro de atendimento realizado.

* **Atributos:**
    * `id`
    * `data`
    * `horario`
    * `problema_texto`
    * `receita_saude []` (Lista de prescrições que pode conter os seguintes: "Remédio (caso médico)", "Atividade física (fisioterapeuta)", "Atividades mentais (psicólogo)")

* **Métodos (CRUD):**
    * defina os métodos para atendimanto

### 3. exame_lab
Representa exames laboratoriais associados a um atendimento.

* **Atributos:**
    * `id`
    * `descrição`

* **Métodos (CRUD):**
    * defina os métodos para exame_lab

---

## Relacionamentos

* **profissional_de_saude <-> atendimento:**
    * Um profissional de saúde pode ter vários atendimentos (1 para muitos `*`), mas um atendimento pode ser associado a somente 1 profissional de saúde (1 para 1).
* **atendimento <-> exame_lab:**
    * Um atendimento pode ter vários exames de laboratório associados (1 para muitos `*`), mas um exame laboratorial pode ser associado a somente 1 atendimento (1 para 1).
