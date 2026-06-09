-- 1. Conecte ao PostgreSQL como superusuário (ex: psql -U postgres)
-- 2. Execute este arquivo inteiro: \i caminho/para/init.sql

CREATE DATABASE saude_db;
\c saude_db

CREATE TABLE profissional_de_saude (
    id        SERIAL PRIMARY KEY,
    nome      VARCHAR(255) NOT NULL,
    telefone  VARCHAR(20),
    endereco  VARCHAR(255),
    categoria VARCHAR(20) NOT NULL
        CHECK (categoria IN ('MEDICO', 'PSICOLOGO', 'FISIOTERAPEUTA'))
);

CREATE TABLE atendimento (
    id               SERIAL PRIMARY KEY,
    data             DATE        NOT NULL,
    horario          TIME        NOT NULL,
    problema_texto   TEXT,
    receita_saude    VARCHAR(20) NOT NULL
        CHECK (receita_saude IN ('REMEDIO', 'ATIVIDADE_FISICA', 'ATIVIDADE_MENTAL')),
    profissional_id  INTEGER     NOT NULL
        REFERENCES profissional_de_saude(id)
);

CREATE TABLE exame_lab (
    id              SERIAL  PRIMARY KEY,
    descricao       VARCHAR(255) NOT NULL,
    atendimento_id  INTEGER      NOT NULL
        REFERENCES atendimento(id)
);
