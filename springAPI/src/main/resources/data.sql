-- Inserir dados na tabela graduacao somente se ainda não existirem

INSERT INTO springapidb.graduacao (nome)
SELECT 'Tecnólogo' WHERE NOT EXISTS (SELECT 1 FROM springapidb.graduacao WHERE nome = 'Tecnólogo');

INSERT INTO springapidb.graduacao (nome)
SELECT 'Licenciatura' WHERE NOT EXISTS (SELECT 1 FROM springapidb.graduacao WHERE nome = 'Licenciatura');

INSERT INTO springapidb.graduacao (nome)
SELECT 'Bacharelado' WHERE NOT EXISTS (SELECT 1 FROM springapidb.graduacao WHERE nome = 'Bacharelado');

INSERT INTO springapidb.graduacao (nome)
SELECT 'Pós-Graduação' WHERE NOT EXISTS (SELECT 1 FROM springapidb.graduacao WHERE nome = 'Pós-Graduação');

INSERT INTO springapidb.graduacao (nome)
SELECT 'MBA' WHERE NOT EXISTS (SELECT 1 FROM springapidb.graduacao WHERE nome = 'MBA');

INSERT INTO springapidb.graduacao (nome)
SELECT 'Especialização' WHERE NOT EXISTS (SELECT 1 FROM springapidb.graduacao WHERE nome = 'Especialização');

INSERT INTO springapidb.graduacao (nome)
SELECT 'Mestrado' WHERE NOT EXISTS (SELECT 1 FROM springapidb.graduacao WHERE nome = 'Mestrado');

INSERT INTO springapidb.graduacao (nome)
SELECT 'Doutorado' WHERE NOT EXISTS (SELECT 1 FROM springapidb.graduacao WHERE nome = 'Doutorado');


-- INSERT PARA TESTES

-- INSERINDO ENDEREÇO
INSERT INTO springapidb.endereco (logradouro, numero, cep, bairro, cidade, estado)
VALUES ('Avenida Azul', 456, '65000000', 'Centro', 'São Luís', 'MA');

-- RECUPERANDO O ID DO ENDEREÇO INSERIDO
SET @idEndereco = LAST_INSERT_ID();

-- INSERINDO CURRÍCULO
INSERT INTO springapidb.curriculo (nome, telefone, foto, fk_id_endereco)
VALUES ('Manoel Gomes', 989654321,
        'https://contigo.com.br/media/uploads/2024/06/quanto-manoel-gomes-ganha-por-show-caneta-azul-multiplicou-o-valor.jpg',
        @idEndereco);

-- RECUPERANDO O ID DO CURRÍCULO INSERIDO
SET @idCurriculo = LAST_INSERT_ID();

-- INSERINDO EXPERIÊNCIAS
INSERT INTO springapidb.experiencia (funcao, empresa, ano_inicio, ano_termino, fk_id_curriculo)
VALUES ('Cantor', 'Carreira Musical', 2013, 0, @idCurriculo),
       ('Compositor', 'Independente', 2010, 0, @idCurriculo);

-- INSERINDO FORMAÇÃO ACADÊMICA
INSERT INTO springapidb.formacao (instituicao, curso, ano_inicio, ano_termino, fk_id_curriculo, fk_id_graduacao)
VALUES ('Faculdade', 'Ensino Médio Completo', 2000, 2003, @idCurriculo, 1);

-- INSERINDO INFORMAÇÕES ADICIONAIS
INSERT INTO springapidb.info_adicional (linkedin, github, instagram, portfolio, fk_id_curriculo)
VALUES ('https://www.linkedin.com/in/manoelgomes',
        'https://github.com/manoelgomes',
        'https://www.instagram.com/manoelgomes',
        'https://www.manoelgomes.com',
        @idCurriculo);

-- INSERINDO ENDEREÇO
INSERT INTO springapidb.endereco (logradouro, numero, cep, bairro, cidade, estado)
VALUES ('Rua da Aurora', 101, '50050000', 'Boa Vista', 'Recife', 'PE');

-- RECUPERANDO O ID DO ENDEREÇO INSERIDO
SET @idEndereco = LAST_INSERT_ID();

-- INSERINDO CURRÍCULO
INSERT INTO springapidb.curriculo (nome, telefone, foto, fk_id_endereco)
VALUES ('Nicolas Cage', 11987654321,
        'https://upload.wikimedia.org/wikipedia/commons/c/c0/Nicolas_Cage_Deauville_2013.jpg',
        @idEndereco);

-- RECUPERANDO O ID DO CURRÍCULO INSERIDO
SET @idCurriculo = LAST_INSERT_ID();

-- INSERINDO EXPERIÊNCIAS
INSERT INTO springapidb.experiencia (funcao, empresa, ano_inicio, ano_termino, fk_id_curriculo)
VALUES ('Desenvolvedor Python', 'Empresa Y', 2022, 0, @idCurriculo),
       ('Desenvolvedor Java', 'Empresa X', 2019, 2022, @idCurriculo);

-- INSERINDO FORMAÇÃO ACADÊMICA
INSERT INTO springapidb.formacao (instituicao, curso, ano_inicio, ano_termino, fk_id_curriculo, fk_id_graduacao)
VALUES ('Faculdade Imaculada da Conceição', 'Análise e Desenvolvimento de Sistemas', 2021, 2023, @idCurriculo, 1);

-- INSERINDO INFORMAÇÕES ADICIONAIS
INSERT INTO springapidb.info_adicional (linkedin, github, instagram, portfolio, fk_id_curriculo)
VALUES ('https://www.linkedin.com/in/nicolascage',
        'https://github.com/nicolascage',
        'https://www.instagram.com/nicolascage',
        'https://www.nicolascage.com',
        @idCurriculo);

-- INSERINDO ENDEREÇO
INSERT INTO springapidb.endereco (logradouro, numero, cep, bairro, cidade, estado)
VALUES ('Avenida do Show', 789, '04000000', 'Morumbi', 'São Paulo', 'SP');

-- RECUPERANDO O ID DO ENDEREÇO INSERIDO
SET @idEndereco = LAST_INSERT_ID();

-- INSERINDO CURRÍCULO
INSERT INTO springapidb.curriculo (nome, telefone, foto, fk_id_endereco)
VALUES ('Fausto Silva', 11912345678,
        'https://miro.medium.com/v2/resize:fit:750/1*U2o7acu-FeGBRyOWTQgTvQ.jpeg',
        @idEndereco);

-- RECUPERANDO O ID DO CURRÍCULO INSERIDO
SET @idCurriculo = LAST_INSERT_ID();

-- INSERINDO EXPERIÊNCIAS
INSERT INTO springapidb.experiencia (funcao, empresa, ano_inicio, ano_termino, fk_id_curriculo)
VALUES ('Apresentador', 'Rede Globo', 1990, 2020, @idCurriculo);

-- INSERINDO FORMAÇÃO ACADÊMICA
INSERT INTO springapidb.formacao (instituicao, curso, ano_inicio, ano_termino, fk_id_curriculo, fk_id_graduacao)
VALUES ('Universidade Paulista', 'Comunicação Social', 1980, 1984, @idCurriculo, 3);

-- INSERINDO INFORMAÇÕES ADICIONAIS
INSERT INTO springapidb.info_adicional (linkedin, github, instagram, portfolio, fk_id_curriculo)
VALUES ('https://www.linkedin.com/in/faustao',
        'https://github.com/faustao',
        'https://www.instagram.com/faustao',
        'https://www.faustao.com',
        @idCurriculo);

-- INSERINDO ENDEREÇO
INSERT INTO springapidb.endereco (logradouro, numero, cep, bairro, cidade, estado)
VALUES ('Avenida Boa Viagem', 100, '51020000', 'Boa Viagem', 'Multiverso', 'PE');

-- RECUPERANDO O ID DO ENDEREÇO INSERIDO
SET @idEndereco = LAST_INSERT_ID();

-- INSERINDO CURRÍCULO
INSERT INTO springapidb.curriculo (nome, telefone, foto, fk_id_endereco)
VALUES ('Rick Sanchez', 1198765432,
        'https://static.tvtropes.org/pmwiki/pub/images/abcb6534_7913_4eb1_a7a5_62b081ebc628.png',
        @idEndereco);

-- RECUPERANDO O ID DO CURRÍCULO INSERIDO
SET @idCurriculo = LAST_INSERT_ID();

-- INSERINDO EXPERIÊNCIAS
INSERT INTO springapidb.experiencia (funcao, empresa, ano_inicio, ano_termino, fk_id_curriculo)
VALUES ('Cientista', 'Cidadão do Multiverso', 1970, 0, @idCurriculo),
       ('Engenheiro Intergaláctico', 'Space Fleet', 1980, 0, @idCurriculo),
       ('Criador de Portal Gun', 'Empreendedor', 1995, 0, @idCurriculo);

-- INSERINDO FORMAÇÃO ACADÊMICA
INSERT INTO springapidb.formacao (instituicao, curso, ano_inicio, ano_termino, fk_id_curriculo, fk_id_graduacao)
VALUES ('Universidade Interdimensional', 'Física Quântica', 1965, 1970, @idCurriculo, 1),
       ('Academia de Ciências da Galáxia', 'Biotecnologia', 1971, 1975, @idCurriculo, 2),
       ('Instituto de Tecnologia do Multiverso', 'Cálculos Dimensionais', 1976, 1980, @idCurriculo, 3),
       ('Universidade da Realidade Alternativa', 'Neurociência Dimensional', 1980, 1984, @idCurriculo, 4);

-- INSERINDO INFORMAÇÕES ADICIONAIS
INSERT INTO springapidb.info_adicional (linkedin, github, instagram, portfolio, fk_id_curriculo)
VALUES ('https://www.linkedin.com/in/ricksanchez',
        'https://github.com/ricksanchez',
        'https://www.instagram.com/ricksanchez',
        'https://www.ricksanchez.com',
        @idCurriculo);

-- INSERINDO ENDEREÇO
INSERT INTO springapidb.endereco (logradouro, numero, cep, bairro, cidade, estado)
VALUES ('Avenida Conselheiro Aguiar', 2020, '51020000', 'Boa Viagem', 'Recife', 'PE');

-- RECUPERANDO O ID DO ENDEREÇO INSERIDO
SET @idEndereco = LAST_INSERT_ID();

-- INSERINDO CURRÍCULO
INSERT INTO springapidb.curriculo (nome, telefone, foto, fk_id_endereco)
VALUES ('Walter White', 11998765432,
        'https://upload.wikimedia.org/wikipedia/en/0/03/Walter_White_S5B.png',
        @idEndereco);

-- RECUPERANDO O ID DO CURRÍCULO INSERIDO
SET @idCurriculo = LAST_INSERT_ID();

-- INSERINDO EXPERIÊNCIAS
INSERT INTO springapidb.experiencia (funcao, empresa, ano_inicio, ano_termino, fk_id_curriculo)
VALUES ('Professor de Química', 'Escola Secundária', 1990, 2000, @idCurriculo),
       ('Químico', 'Cegonha Química', 2001, 2005, @idCurriculo),
       ('Empreendedor de Cristais', 'Heisenberg Industries', 2005, 0, @idCurriculo);

-- INSERINDO FORMAÇÃO ACADÊMICA
INSERT INTO springapidb.formacao (instituicao, curso, ano_inicio, ano_termino, fk_id_curriculo, fk_id_graduacao)
VALUES ('Universidade de Albuquerque', 'Química', 1980, 1984, @idCurriculo, 1),
       ('Instituto de Pesquisa Química', 'Química Orgânica', 1985, 1989, @idCurriculo, 2),
       ('Universidade de Princeton', 'Química Medicinal', 1989, 1991, @idCurriculo, 3),
       ('Universidade de Harvard', 'Química Avançada', 1992, 1994, @idCurriculo, 4);

-- INSERINDO INFORMAÇÕES ADICIONAIS
INSERT INTO springapidb.info_adicional (linkedin, github, instagram, portfolio, fk_id_curriculo)
VALUES ('https://www.linkedin.com/in/walterwhite',
        'https://github.com/walterwhite',
        'https://www.instagram.com/walterwhite',
        'https://www.walterwhite.com',
        @idCurriculo);

