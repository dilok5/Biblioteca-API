package br.com.fecaf.controller;

import br.com.fecaf.model.Livro;
import br.com.fecaf.services.LivroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livros")
@CrossOrigin(origins = "http://127.0.0.1:5500", allowedHeaders = "*")
public class LivroController {

    @Autowired
    private LivroService livroService;

    //Endpoint para listar livros
    @GetMapping("/listarLivros")
    public List<Livro> listarLivros(){
        return livroService.listarLivros();
    }

    //Endpoint para cadastrar livros
    @PostMapping("/cadastrarLivro")
    public ResponseEntity<Livro> salvarLivro(@RequestBody Livro livro){
        Livro newLivro = livroService.salvarLivro(livro);
        return ResponseEntity.status(HttpStatus.CREATED).body(newLivro);
    }

    //Endpoint para deletar livros
    @DeleteMapping("/deletarLivro/{id}")
    public ResponseEntity<Void> deletarLivro(@PathVariable int id){
        livroService.deletarLivro(id);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();

    }

    //Endpoint para atualizar um livro existente
    @PutMapping("/atualizarLivro/{id}")
    public ResponseEntity<Livro> atualizarLivro(@PathVariable Integer id, @RequestBody Livro livro) {
        Livro livroAtualizado = livroService.atualizarLivro(id, livro);

        if (livroAtualizado != null) {
            return ResponseEntity.ok(livroAtualizado);
        } else {
            return ResponseEntity.notFound().build();

        }

    }
}
