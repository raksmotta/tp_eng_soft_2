# Sistema de Gestão de Atendimentos de Saúde
# Antônio Drumond e Raquel Motta

Sistema web para gerenciar pacientes, profissionais de saúde, atendimentos e exames laboratoriais.

## Funcionalidades

### Cadastros
- **Pacientes** — nome, CPF, data de nascimento e telefone
- **Profissionais de saúde** — nome, telefone, endereço e categoria (Médico, Psicólogo, Fisioterapeuta)
- **Atendimentos** — data, horário, paciente, profissional, descrição do problema e tipo de receita
- **Exames laboratoriais** — vinculados a um atendimento

### Interface
- Tabelas com painel de detalhes lateral: clicar em qualquer linha abre um card com todas as informações e ações do registro; clicar novamente ou fechar o X fecha o card
- Busca por nome em Pacientes e Profissionais — ativada ao pressionar Enter ou clicar em "Pesquisar"; suporta termos parciais (ex.: "Maria" retorna "Maria Alves" e "Mariana Ribeiro")
- Exames de um atendimento exibidos diretamente no card de detalhes, com botão para adicionar e lixeira para excluir cada exame individualmente
- Atendimentos ordenáveis por **Data** (padrão, mais recente primeiro), **Paciente** ou **Profissional**
- Datas exibidas no formato **dd/mm/aaaa**

### Restrições
- Não é permitido excluir um **paciente** que possua atendimentos vinculados — um aviso é exibido na tela
- Não é permitido excluir um **profissional** que possua atendimentos vinculados — um aviso é exibido na tela

## Tecnologias

| Camada    | Tecnologia                              |
|-----------|-----------------------------------------|
| Backend   | Java 17+ · Spring Boot 3.2 · Maven      |
| Frontend  | React 18 · React Router 6 · Bootstrap 5 |
| Banco     | PostgreSQL 15                           |

---

## Pré-requisitos

Antes de começar, instale:

- **Java 17+** — [adoptium.net](https://adoptium.net)
- **Maven** — [maven.apache.org/download.cgi](https://maven.apache.org/download.cgi) (baixe o *Binary zip archive*, extraia em `C:\apache-maven-3.9.x` e adicione `C:\apache-maven-3.9.x\bin` ao PATH)
- **Node.js 20+** — [nodejs.org](https://nodejs.org)
- **PostgreSQL 15** — [postgresql.org/download](https://www.postgresql.org/download) (anote a senha do usuário `postgres` durante a instalação)

### Verificando as instalações

Abra um terminal e rode:

```bash
java -version   # deve mostrar 17 ou superior
mvn -v          # deve mostrar a versão do Maven
node -v         # deve mostrar v20 ou superior
npm -v          # deve mostrar a versão do npm
```

---

## Configuração do Banco de Dados

Execute os scripts na ordem abaixo usando o `psql`:

```bash
psql -U postgres -f banco/init.sql   # cria o banco e as tabelas
psql -U postgres -d saude_db -f banco/seed.sql  # popula com dados de exemplo
```

Ou, pelo **SQL Shell (psql)** interativo:
1. Pressione **Enter** nas primeiras quatro perguntas e digite sua senha na última
2. Execute: `\i caminho/para/banco/init.sql`
3. Execute: `\i caminho/para/banco/seed.sql`

### Ajustando as credenciais (se necessário)

Se você definiu um usuário ou senha diferente durante a instalação do PostgreSQL, edite `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/saude_db
spring.datasource.username=postgres
spring.datasource.password=sua_senha_aqui
```

---

## Rodando o Projeto

Você precisará de **dois terminais abertos ao mesmo tempo**.

### Terminal 1 — Backend

```bash
cd backend
mvn spring-boot:run
```

Aguarde aparecer `Started SaudeApplication` — o backend estará rodando em `http://localhost:8080`.

> Na primeira execução o Maven baixa as dependências; pode demorar alguns minutos.

### Terminal 2 — Frontend

```bash
cd frontend
npm install       # apenas na primeira vez
npm run dev
```

Acesse **http://localhost:5173** no navegador.

---

## Encerrando o Projeto

Em cada terminal, pressione `Ctrl + C`.

O PostgreSQL continuará rodando em segundo plano como serviço do sistema — isso é normal e não precisa ser encerrado.

---

## Estrutura de Pastas

```
engsoft2trabalho/
├── backend/
│   ├── src/main/java/com/saude/
│   │   ├── controller/   # endpoints REST
│   │   ├── model/        # entidades JPA e enums
│   │   ├── repository/   # interfaces de acesso ao banco
│   │   └── service/      # regras de negócio
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/   # Paciente, Profissional, Atendimento, ExameLab
│   │   └── services/     # chamadas à API (api.js)
│   ├── package.json
│   └── vite.config.js
└── banco/
    ├── init.sql          # criação das tabelas
    └── seed.sql          # dados de exemplo
```
