package com.saude.controller;

import com.saude.model.ExameLab;
import com.saude.service.ExameLabService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/exames")
@CrossOrigin(origins = "http://localhost:5173")
public class ExameLabController {

    private final ExameLabService service;

    public ExameLabController(ExameLabService service) {
        this.service = service;
    }

    @GetMapping("/atendimento/{atendimentoId}")
    public List<ExameLab> buscarPorAtendimento(@PathVariable Integer atendimentoId) {
        return service.consultarPorAtendimento(atendimentoId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExameLab> buscarPorId(@PathVariable Integer id) {
        return service.consultarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ExameLab inserir(@RequestBody ExameLab exame) {
        return service.inserir(exame);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExameLab> alterar(@PathVariable Integer id,
                                             @RequestBody ExameLab dados) {
        return service.alterar(id, dados)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Integer id) {
        return service.excluir(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
