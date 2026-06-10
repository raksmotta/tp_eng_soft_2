package com.saude.service;

import com.saude.model.Paciente;
import com.saude.repository.PacienteRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {

    private final PacienteRepository repository;

    public PacienteService(PacienteRepository repository) {
        this.repository = repository;
    }

    public Paciente inserir(Paciente paciente) {
        return repository.save(paciente);
    }

    public Optional<Paciente> alterar(Integer id, Paciente dados) {
        return repository.findById(id).map(p -> {
            p.setNome(dados.getNome());
            p.setCpf(dados.getCpf());
            p.setDataNascimento(dados.getDataNascimento());
            p.setTelefone(dados.getTelefone());
            return repository.save(p);
        });
    }

    public Optional<Paciente> consultarPorId(Integer id) {
        return repository.findById(id);
    }

    public List<Paciente> consultarPorNome(String nome) {
        return repository.findByNomeContainingIgnoreCase(nome);
    }

    public List<Paciente> listarTodos() {
        return repository.findAll();
    }

    public boolean excluir(Integer id) {
        if (!repository.existsById(id)) return false;
        repository.deleteById(id);
        return true;
    }
}
