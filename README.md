# Sistema de Gestão de Atendimentos de Saúde
# Antônio Drumond e Raquel Motta

Sistema web para gerenciar profissionais de saúde, atendimentos e exames laboratoriais.

## Funcionalidades

- Cadastro de profissionais de saúde (Médico, Psicólogo, Fisioterapeuta)
- Registro de atendimentos com data, horário, problema e receita
- Gerenciamento de exames laboratoriais vinculados a atendimentos

## Tecnologias

| Camada    | Tecnologia                  |
|-----------|-----------------------------|
| Backend   | Java 17+ · Spring Boot 3.2 · Maven |
| Frontend  | React 18 · Node.js 20       |
| Banco     | PostgreSQL 15               |

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

1. Abra o **SQL Shell (psql)** instalado com o PostgreSQL
2. Pressione **Enter** nas primeiras quatro perguntas e digite sua senha na última:
   ```
   Server [localhost]:         ← Enter
   Database [postgres]:        ← Enter
   Port [5432]:                ← Enter
   Username [postgres]:        ← Enter
   Password for user postgres: ← sua senha
   ```
3. Crie o banco:
   ```sql
   CREATE DATABASE saude_db;
   ```
4. Confirme que apareceu `CREATE DATABASE` e saia:
   ```sql
   \q
   ```

> O Spring Boot cria as tabelas automaticamente na primeira execução.

### Ajustando as credenciais (se necessário)

Se você definiu um usuário ou senha diferente durante a instalação do PostgreSQL, edite o arquivo `backend/src/main/resources/application.properties`:

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

> Na primeira execução o Maven baixa as dependências, pode demorar alguns minutos.

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
│   │   ├── components/   # Profissional, Atendimento, ExameLab
│   │   └── services/     # chamadas à API
│   ├── package.json
│   └── vite.config.js
└── banco/
    └── init.sql          # script opcional de criação manual das tabelas
```
