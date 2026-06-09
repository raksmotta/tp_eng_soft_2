package com.saude.service;

import com.saude.model.Atendimento;
import com.saude.model.TipoReceita;
import com.saude.repository.AtendimentoRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AtendimentoService {

    private final AtendimentoRepository repository;

    public AtendimentoService(AtendimentoRepository repository) {
        this.repository = repository;
    }

    public Atendimento inserir(Atendimento atendimento) {
        return repository.save(atendimento);
    }

    public Optional<Atendimento> alterar(Integer id, Atendimento dados) {
        return repository.findById(id).map(a -> {
            a.setData(dados.getData());
            a.setHorario(dados.getHorario());
            a.setProblemaTexto(dados.getProblemaTexto());
            a.setReceitaSaude(dados.getReceitaSaude());
            a.setProfissional(dados.getProfissional());
            return repository.save(a);
        });
    }

    public Optional<Atendimento> consultarPorId(Integer id) {
        return repository.findById(id);
    }

    public List<Atendimento> consultarPorData(LocalDate data) {
        return repository.findByData(data);
    }

    public List<Atendimento> consultarPorProfissional(Integer profissionalId) {
        return repository.findByProfissionalId(profissionalId);
    }

    public List<Atendimento> consultarPorReceita(TipoReceita receita) {
        return repository.findByReceitaSaude(receita);
    }

    public List<Atendimento> listarTodos() {
        return repository.findAll();
    }

    public boolean excluir(Integer id) {
        if (!repository.existsById(id)) return false;
        repository.deleteById(id);
        return true;
    }
}
