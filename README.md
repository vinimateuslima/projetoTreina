# Projeto Final Treian
Este projeto é uma página de administração de currículos feito utilizando Spring Boot e React para o projeto final proposto pelo professor João Ferreira do Curso de Desenvolvimento Full Stack da Treina Recife.


## 🚀 Começando

Bem-vindo ao projeto! Este guia irá ajudá-lo a configurar o ambiente necessário para rodar o projeto na sua máquina local. <br>
Siga as instruções abaixo para garantir que tudo esteja funcionando corretamente para desenvolvimento e testes.

### 📋 Pré-requisitos

Para um bom funcionamento você precisará dos seguintes programas: <br>

- **Java JDK 17+** - [Download](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html)
- **VS Code** - [Download](https://code.visualstudio.com/)
- **NodeJS v20.5.1** - [Download](https://nodejs.org/en/download/)

Lembre-se de configurar as variáveis de ambiente do Java

### ⚙️ Configuração do projeto

### 1. Clonar o Repositório

Primeiro, faça o clone do repositório para o seu ambiente local:

```bash
git clone https://github.com/vinimateuslima/projetoTreina.git
```

### 🍃 Configuração do Back End

### 2. Crie uma base de dados no MySQL WorkBench chamada "springapidb" e um usuário e senha chamado "treina"
```sql
drop database springapiDB;

create database springapiDB;

USE springapiDB;
```

### 3. Após isso, abra o arquivo chamado application.properties no caminho "springAPI\src\main\resources" e verifique se está tudo correto



```
spring.datasource.url=jdbc:mysql://localhost:3306/springapidb?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=treina
spring.datasource.password=treina
```

### 4. Inicialize o Spring Boot e verifique se ele criará as tabelas automaticamente

Você pode inicializar clicando em Run na sua IDE ou através da linha de comando abaixo
```cmd
./mvnw spring-boot:run
```

### 5. Verifique o arquivo data.sql na pasta resources

Este arquivo é um script com inserts importantes, ele é executado automaticamente inserindo os dados na tabela Graduação

### Caso o spring não tenha executado, faça o insert manualmente deste trecho
```sql
INSERT INTO springapidb.graduacao (nome) 
VALUES 
  ('Tecnólogo'),
 ('Licenciatura'),
('Bacharelado'),
('Pós-Graduação'),
('MBA'),
('Especialização'),
('Mestrado'),
('Doutorado');
```
### 6. Após isso, seu Back End ficará online e disponível para testes

Você pode utilizar as seguintes rotas para teste

### Rotas da API

- ![GET](https://img.shields.io/badge/GET-green) `/curriculos` - **Retorna todos os currículos**
- ![GET](https://img.shields.io/badge/GET-green) `GET /curriculos/{id}` - **Retorna o currículo específico pelo ID**   
- ![POST](https://img.shields.io/badge/POST-blue) `POST /curriculos` - **Cria um novo currículo**
- ![PUT](https://img.shields.io/badge/PUT-orange)  `PUT /curriculos/{id}` - **Atualiza um currículo existente**  
- ![DELETE](https://img.shields.io/badge/DELETE-red) `DELETE /curriculos/{id}` - **Deleta um currículo pelo ID**

Você pode utilizar um JSON como exemplo de cadastro neste link [Gist aqui](https://gist.github.com/seu_usuario/gist_id).




*Se preferir você pode criar um banco de dados com qualquer nome e usuário, desde que atualize o arquivo application.properties e essas variáveis com os dados do seu banco*









## ⚙️ Executando os testes

Para executar o programa compile a classe UrnaEletronicaJava.java e execute


## 🛠️ Construído com

![HTML5](https://img.shields.io/badge/HTML5-000?style=for-the-badge&logo=html5)
![CSS3](https://img.shields.io/badge/CSS3-000?style=for-the-badge&logo=css3&logoColor=264CE4)
![Javascript](https://img.shields.io/badge/Javascript-000?style=for-the-badge&logo=javascript)
![React](https://img.shields.io/badge/React-000?style=for-the-badge&logo=react&logoColor=61DBFB)
![Spring](https://img.shields.io/badge/Spring-000?style=for-the-badge&logo=spring&logoColor=42B700)


## ✒️ Autores

* **Vinicius Lima** - *Desenvolvedor* - [GitHub](https://github.com/vinimateuslima)
* **João Ferreira** - *Professor* - [GitHub](https://github.com/joaoferreirape)

## 📄 Licença

Este projeto está sob a licença [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/) - veja o arquivo LICENSE.md para detalhes.

## Conecte-se comigo

[![Portfólio](https://img.shields.io/badge/-Portfólio-30A3DC?style=for-the-badge)](https://vinimateuslima.github.io/portfolio-vinicius-lima)
[![E-mail](https://img.shields.io/badge/-Email-000?style=for-the-badge&logo=microsoft-outlook&logoColor=E94D5F)](mailto:viniciusmateus.dev@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-000?style=for-the-badge&logo=linkedin&logoColor=0E76A8)](https://www.linkedin.com/in/vinicius-lima-924807181/)

## 🛠 Habilidades

![HTML5](https://img.shields.io/badge/HTML5-000?style=for-the-badge&logo=html5)
![CSS3](https://img.shields.io/badge/CSS3-000?style=for-the-badge&logo=css3&logoColor=264CE4)
![TypeScript](https://img.shields.io/badge/TypeScript-000?style=for-the-badge&logo=typescript)
![Java](https://img.shields.io/badge/Java-000?style=for-the-badge&logo=java)
![React](https://img.shields.io/badge/React-000?style=for-the-badge&logo=react)
![Angular](https://img.shields.io/badge/Angular-000?style=for-the-badge&logo=angular&logoColor=C3002F)

## 🔗 Vamos trabalhar juntos?
[![LinkedIn](https://img.shields.io/badge/LinkedIn-000?style=for-the-badge&logo=linkedin&logoColor=0E76A8)](https://www.linkedin.com/in/vinicius-lima-924807181/)
[![Instagram](https://img.shields.io/badge/Instagram-000?style=for-the-badge&logo=instagram)](https://www.instagram.com/viniciuslimadev/)
