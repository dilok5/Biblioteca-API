# 📚 Sistema de Gestão de Livros com Spring Boot

Este projeto permite o gerenciamento de livros por meio de uma API REST desenvolvida com **Spring Boot (Java)** e integrada a um banco de dados **MySQL**. O front-end pode ser um sistema em **HTML, CSS e JavaScript** para interagir com a API.

---

## 🚀 Como Executar o Projeto

### 1️⃣ Instalar Dependências Necessárias

Antes de iniciar, verifique se tem as seguintes ferramentas instaladas:

✅ **Java JDK 17+** → Verifique com:
```sh
java -version
```
Caso não tenha, [baixe aqui](https://maven.apache.org/download.cgi).

✅ **MySQL Server** → Verifique com:
```sh
mysql --version
```
✅ **Postman** (opcional, para testar a API).

---

### 2️⃣ Configurar o Banco de Dados

Abra o MySQL e execute:

```sql
CREATE DATABASE db_livros;
USE db_livros;

CREATE TABLE tbl_livros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    ano_publicacao INT,
    favorito BOOLEAN DEFAULT FALSE,
    foto VARCHAR(255)
);

INSERT INTO tbl_livros (titulo, autor, ano_publicacao, favorito, foto) VALUES 
("O Livro Vermelho", "C.G. Jung", 2017, false, "https://m.media-amazon.com/images/I/715a5Cfa3dL._SY466_.jpg");
```
### 3️⃣ Configurar o `application.properties`

No diretório `src/main/resources/`, edite o arquivo `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/db_livros
spring.datasource.username=root
spring.datasource.password=SUASENHA
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
````
🔴 **Troque `SUASENHA` pela senha do MySQL!**

Se não souber sua senha, tente acessar o MySQL:

```sh
mysql -u root -p
```
4️⃣ **Rodar a Aplicação Back-end**

1. Navegue até a pasta do projeto e execute o seguinte comando no terminal:

    ```bash
    mvn spring-boot:run
    ```

2. Ou, caso esteja utilizando **IntelliJ** ou **VS Code**, execute a classe `LivroApplication` (ou `Main`) e clique em **Run ▶️**.

3. Se tudo estiver correto, você verá no terminal:

    ```bash
    Tomcat started on port 8080
    Started LivroApplication in X seconds
    ```

Isso significa que a API já está rodando!

5️⃣ **Testar a API**

Agora, você pode testar as requisições diretamente no **Postman** ou no navegador.

### ➤ Listar Livros (GET)
- Acesse no navegador:
    ```bash
    http://localhost:8080/api/livros/listarLivros
    ```
- Ou faça a requisição no **Postman**:
    - **Método**: GET
    - **URL**: `http://localhost:8080/api/livros/listarLivros`

### ➤ Cadastrar Livro (POST)
- **Método**: POST
- **URL**: `http://localhost:8080/api/livros/cadastrarLivro`
- **Headers**: `Content-Type: application/json`
- **Body (JSON)**:
    ```json
    {
      "titulo": "Clean Code",
      "autor": "Robert C. Martin",
      "anoPublicacao": 2008,
      "favorito": true,
      "foto": "https://m.media-amazon.com/images/I/41SH-SvWPxL.jpg"
    }
    ```
- Se retornar **201 Created**, significa que o livro foi cadastrado com sucesso! ✅

6️⃣ **Rodar o Front-end**

Caso já tenha um front-end configurado, vá até a pasta dele e inicie com:

```bash
npx live-server
```
Ou, se preferir:

```bash
python -m http.server 5500
```
Agora, abra no navegador:

```arduino
http://127.0.0.1:5500/index.html
```
E teste a interação com a API!



