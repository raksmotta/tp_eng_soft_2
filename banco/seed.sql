-- Pacientes
INSERT INTO paciente (nome, cpf, data_nascimento, telefone) VALUES
('João Carlos Silva',       '123.456.789-00', '1985-03-15', '(11) 99111-2222'),
('Maria Fernanda Santos',   '234.567.890-11', '1990-07-22', '(21) 99222-3333'),
('Pedro Henrique Oliveira', '345.678.901-22', '1978-11-08', '(31) 99333-4444'),
('Ana Beatriz Costa',       '456.789.012-33', '1995-04-30', '(41) 99444-5555'),
('Beatriz Nascimento Lima', '567.890.123-44', '1982-09-14', '(51) 99555-6666'),
('Rafael Eduardo Souza',    '678.901.234-55', '1988-01-27', '(61) 99666-7777'),
('Larissa Cristina Ferreira','789.012.345-66','1993-06-03', '(71) 99777-8888'),
('Marcos Antônio Alves',    '890.123.456-77', '1975-12-19', '(85) 99888-9999');

-- Profissionais de Saúde
INSERT INTO profissional_de_saude (nome, telefone, endereco, categoria) VALUES
('Ana Paula Ferreira',   '(11) 98765-4321', 'Rua das Flores, 123 - São Paulo',         'MEDICO'),
('Carlos Eduardo Santos','(21) 97654-3210', 'Av. Atlântica, 456 - Rio de Janeiro',      'MEDICO'),
('Mariana Oliveira',     '(31) 96543-2109', 'Rua Bahia, 789 - Belo Horizonte',          'MEDICO'),
('Roberto Lima',         '(41) 95432-1098', 'Al. Cabral, 101 - Curitiba',               'MEDICO'),
('Fernanda Costa',       '(11) 94321-0987', 'Rua Augusta, 202 - São Paulo',             'PSICOLOGO'),
('Lucas Mendes',         '(85) 93210-9876', 'Av. Beira Mar, 303 - Fortaleza',           'PSICOLOGO'),
('Patricia Alves',       '(51) 92109-8765', 'Rua dos Andradas, 404 - Porto Alegre',     'PSICOLOGO'),
('Thiago Rodrigues',     '(61) 91098-7654', 'SQN 310 Bloco B, 505 - Brasília',         'FISIOTERAPEUTA'),
('Camila Souza',         '(71) 90987-6543', 'Av. Sete de Setembro, 606 - Salvador',     'FISIOTERAPEUTA'),
('Diego Nascimento',     '(92) 89876-5432', 'Rua Recife, 707 - Manaus',                'FISIOTERAPEUTA');

-- Atendimentos
INSERT INTO atendimento (data, horario, problema_texto, receita_saude, profissional_id, paciente_id) VALUES
('2025-01-10', '09:00', 'Dor de cabeça frequente e tontura ao se levantar',         'REMEDIO',          1,  1),
('2025-01-15', '10:30', 'Ansiedade generalizada e dificuldade para dormir',          'ATIVIDADE_MENTAL', 5,  2),
('2025-01-20', '14:00', 'Dor lombar intensa após esforço físico no trabalho',        'ATIVIDADE_FISICA', 8,  3),
('2025-02-03', '08:30', 'Tosse persistente há duas semanas, febre baixa',            'REMEDIO',          2,  1),
('2025-02-10', '11:00', 'Crises de pânico recorrentes e estresse ocupacional',       'ATIVIDADE_MENTAL', 6,  4),
('2025-02-18', '15:30', 'Lesão ligamentar no joelho direito após queda',             'ATIVIDADE_FISICA', 9,  5),
('2025-03-05', '09:30', 'Hipertensão arterial — pressão elevada em repouso',         'REMEDIO',          3,  6),
('2025-03-12', '13:00', 'Depressão leve, baixa autoestima e isolamento social',      'ATIVIDADE_MENTAL', 7,  2),
('2025-03-20', '16:00', 'Dor crônica no ombro esquerdo com limitação de movimento',  'ATIVIDADE_FISICA', 10, 7),
('2025-04-02', '10:00', 'Diabetes tipo 2 — controle glicêmico insatisfatório',       'REMEDIO',          4,  8),
('2025-04-15', '09:00', 'Fobia social com evitação de situações públicas',           'ATIVIDADE_MENTAL', 5,  4),
('2025-04-22', '14:30', 'Tendinite no tornozelo direito, dor ao caminhar',           'ATIVIDADE_FISICA', 8,  3),
('2025-05-08', '11:30', 'Gripe com inflamação na garganta e dor de ouvido',          'REMEDIO',          1,  1),
('2025-05-19', '10:00', 'Síndrome de burnout, exaustão emocional severa',            'ATIVIDADE_MENTAL', 6,  6),
('2025-05-28', '15:00', 'Reabilitação pós-cirurgia de prótese no quadril esquerdo',  'ATIVIDADE_FISICA', 9,  5);

-- Exames por atendimento
-- Atendimento 1 — 2 exames
INSERT INTO exame_lab (descricao, atendimento_id) VALUES
('Hemograma completo', 1),
('Tomografia craniana sem contraste', 1);

-- Atendimento 2 — 1 exame
INSERT INTO exame_lab (descricao, atendimento_id) VALUES
('Eletroencefalograma', 2);

-- Atendimento 3 — 0 exames

-- Atendimento 4 — 3 exames
INSERT INTO exame_lab (descricao, atendimento_id) VALUES
('Raio-X de tórax', 4),
('Hemograma e PCR', 4),
('Cultura de escarro', 4);

-- Atendimento 5 — 1 exame
INSERT INTO exame_lab (descricao, atendimento_id) VALUES
('Avaliação psicológica inicial (escala HAD)', 5);

-- Atendimento 6 — 2 exames
INSERT INTO exame_lab (descricao, atendimento_id) VALUES
('Raio-X do joelho direito', 6),
('Ressonância magnética do joelho direito', 6);

-- Atendimento 7 — 2 exames
INSERT INTO exame_lab (descricao, atendimento_id) VALUES
('Eletrocardiograma em repouso', 7),
('Dosagem de sódio e potássio', 7);

-- Atendimento 8 — 0 exames

-- Atendimento 9 — 1 exame
INSERT INTO exame_lab (descricao, atendimento_id) VALUES
('Raio-X do ombro esquerdo', 9);

-- Atendimento 10 — 3 exames
INSERT INTO exame_lab (descricao, atendimento_id) VALUES
('Glicemia em jejum', 10),
('Hemoglobina glicada (HbA1c)', 10),
('Perfil lipídico completo', 10);

-- Atendimento 11 — 1 exame
INSERT INTO exame_lab (descricao, atendimento_id) VALUES
('Escala de ansiedade social (LSAS)', 11);

-- Atendimento 12 — 0 exames

-- Atendimento 13 — 2 exames
INSERT INTO exame_lab (descricao, atendimento_id) VALUES
('Teste rápido de influenza', 13),
('Hemograma com diferencial', 13);

-- Atendimento 14 — 1 exame
INSERT INTO exame_lab (descricao, atendimento_id) VALUES
('Escala de burnout de Maslach (MBI)', 14);

-- Atendimento 15 — 3 exames
INSERT INTO exame_lab (descricao, atendimento_id) VALUES
('Raio-X do quadril esquerdo', 15),
('Avaliação de amplitude de movimento (goniometria)', 15),
('Densitometria óssea', 15);
