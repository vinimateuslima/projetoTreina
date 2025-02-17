-- Inserir dados na tabela graduacao somente se ainda não existirem
INSERT INTO springapidb.graduacao (nome)
SELECT 'Bacharelado' WHERE NOT EXISTS (SELECT 1 FROM springapidb.graduacao WHERE nome = 'Bacharelado');

INSERT INTO springapidb.graduacao (nome)
SELECT 'Licenciatura' WHERE NOT EXISTS (SELECT 1 FROM springapidb.graduacao WHERE nome = 'Licenciatura');

INSERT INTO springapidb.graduacao (nome)
SELECT 'Tecnólogo' WHERE NOT EXISTS (SELECT 1 FROM springapidb.graduacao WHERE nome = 'Tecnólogo');

INSERT INTO springapidb.graduacao (nome)
SELECT 'Mestrado' WHERE NOT EXISTS (SELECT 1 FROM springapidb.graduacao WHERE nome = 'Mestrado');

INSERT INTO springapidb.graduacao (nome)
SELECT 'Doutorado' WHERE NOT EXISTS (SELECT 1 FROM springapidb.graduacao WHERE nome = 'Doutorado');

INSERT INTO springapidb.graduacao (nome)
SELECT 'Pós-Graduação' WHERE NOT EXISTS (SELECT 1 FROM springapidb.graduacao WHERE nome = 'Pós-Graduação');

INSERT INTO springapidb.graduacao (nome)
SELECT 'MBA' WHERE NOT EXISTS (SELECT 1 FROM springapidb.graduacao WHERE nome = 'MBA');

INSERT INTO springapidb.graduacao (nome)
SELECT 'Especialização' WHERE NOT EXISTS (SELECT 1 FROM springapidb.graduacao WHERE nome = 'Especialização');
