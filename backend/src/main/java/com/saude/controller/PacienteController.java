package com.saude.controller;

import com.saude.model.Paciente;
import com.saude.service.PacienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
@CrossOrigin(origins = "http://localhost:5173")
public class PacienteController {

    private final PacienteService service;

    public PacienteController(PacienteService service) {
        this.service = service;
    }

    @GetMapping
    public List<Paciente> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Paciente> buscarPorId(@PathVariable Integer id) {
        return service.consultarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/buscar")
    public List<Paciente> buscarPorNome(@RequestParam String nome) {
        return service.consultarPorNome(nome);
    }

    @PostMapping
    public Paciente inserir(@RequestBody Paciente paciente) {
        return service.inserir(paciente);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Paciente> alterar(@PathVariable Integer id,
                                             @RequestBody Paciente dados) {
        return service.alterar(id, dados)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Integer id) {
        return service.excluir(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
