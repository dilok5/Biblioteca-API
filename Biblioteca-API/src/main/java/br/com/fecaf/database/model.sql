CREATE DATABASE db_livros;
USE db_livros;

CREATE TABLE tbl_livros (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(45) NOT NULL,
    autor VARCHAR(45) NOT NULL,
    ano_publicacao INT,
    favorito BOOLEAN,
    foto VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO tbl_livros(id, titulo, autor, ano_publicacao, favorito, foto)
VALUES
(0, "O Livro Vermelho", "C.G. Jung", 2017, false, "https://ia904502.us.archive.org/BookReader/BookReaderImages.php?zip=/7/items/o-livro-vermelho-jung/O%20Livro%20Vermelho%20-%20Jung_jp2.zip&file=O%20Livro%20Vermelho%20-%20Jung_jp2/O%20Livro%20Vermelho%20-%20Jung_0000.jp2&id=o-livro-vermelho-jung&scale=8&rotate=0");

SELECT * FROM tbl_livros;
