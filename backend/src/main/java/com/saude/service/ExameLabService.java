package com.saude.service;

import com.saude.model.ExameLab;
import com.saude.repository.ExameLabRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ExameLabService {

    private final ExameLabRepository repository;

    public ExameLabService(ExameLabRepository repository) {
        this.repository = repository;
    }

    public ExameLab inserir(ExameLab exame) {
        return repository.save(exame);
    }

    public Optional<ExameLab> alterar(Integer id, ExameLab dados) {
        return repository.findById(id).map(e -> {
            e.setDescricao(dados.getDescricao());
            e.setAtendimento(dados.getAtendimento());
            return repository.save(e);
        });
    }

    public Optional<ExameLab> consultarPorId(Integer id) {
        return repository.findById(id);
    }

    public List<ExameLab> consultarPorAtendimento(Integer atendimentoId) {
        return repository.findByAtendimentoId(atendimentoId);
    }

    public boolean excluir(Integer id) {
        if (!repository.existsById(id)) return false;
        repository.deleteById(id);
        return true;
    }
}
