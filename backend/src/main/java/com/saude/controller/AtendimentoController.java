package com.saude.controller;

import com.saude.model.Atendimento;
import com.saude.model.TipoReceita;
import com.saude.service.AtendimentoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/atendimentos")
@CrossOrigin(origins = "http://localhost:5173")
public class AtendimentoController {

    private final AtendimentoService service;

    public AtendimentoController(AtendimentoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Atendimento> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Atendimento> buscarPorId(@PathVariable Integer id) {
        return service.consultarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/data/{data}")
    public List<Atendimento> buscarPorData(@PathVariable LocalDate data) {
        return service.consultarPorData(data);
    }

    @GetMapping("/profissional/{profissionalId}")
    public List<Atendimento> buscarPorProfissional(@PathVariable Integer profissionalId) {
        return service.consultarPorProfissional(profissionalId);
    }

    @GetMapping("/paciente/{pacienteId}")
    public List<Atendimento> buscarPorPaciente(@PathVariable Integer pacienteId) {
        return service.consultarPorPaciente(pacienteId);
    }

    @GetMapping("/receita/{receita}")
    public List<Atendimento> buscarPorReceita(@PathVariable TipoReceita receita) {
        return service.consultarPorReceita(receita);
    }

    @PostMapping
    public Atendimento inserir(@RequestBody Atendimento atendimento) {
        return service.inserir(atendimento);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Atendimento> alterar(@PathVariable Integer id,
                                                @RequestBody Atendimento dados) {
        return service.alterar(id, dados)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Integer id) {
        return service.excluir(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
