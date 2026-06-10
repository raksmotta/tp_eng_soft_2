package com.saude.controller;

import com.saude.model.CategoriaProfissional;
import com.saude.model.ProfissionalDeSaude;
import com.saude.service.ProfissionalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/profissionais")
@CrossOrigin(origins = "http://localhost:5173")
public class ProfissionalController {

    private final ProfissionalService service;

    public ProfissionalController(ProfissionalService service) {
        this.service = service;
    }

    @GetMapping
    public List<ProfissionalDeSaude> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfissionalDeSaude> buscarPorId(@PathVariable Integer id) {
        return service.consultarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/buscar")
    public List<ProfissionalDeSaude> buscarPorNome(@RequestParam String nome) {
        return service.consultarPorNome(nome);
    }

    @GetMapping("/categoria/{categoria}")
    public List<ProfissionalDeSaude> buscarPorCategoria(@PathVariable CategoriaProfissional categoria) {
        return service.consultarPorCategoria(categoria);
    }

    @PostMapping
    public ProfissionalDeSaude inserir(@RequestBody ProfissionalDeSaude profissional) {
        return service.inserir(profissional);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfissionalDeSaude> alterar(@PathVariable Integer id,
                                                        @RequestBody ProfissionalDeSaude dados) {
        return service.alterar(id, dados)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> excluir(@PathVariable Integer id) {
        try {
            return service.excluir(id)
                    ? ResponseEntity.noContent().build()
                    : ResponseEntity.notFound().build();
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode())
                    .body(Map.of("message", e.getReason()));
        }
    }
}
