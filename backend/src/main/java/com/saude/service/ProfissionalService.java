package com.saude.service;

import com.saude.model.CategoriaProfissional;
import com.saude.model.ProfissionalDeSaude;
import com.saude.repository.ProfissionalRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProfissionalService {

    private final ProfissionalRepository repository;

    public ProfissionalService(ProfissionalRepository repository) {
        this.repository = repository;
    }

    public ProfissionalDeSaude inserir(ProfissionalDeSaude profissional) {
        return repository.save(profissional);
    }

    public Optional<ProfissionalDeSaude> alterar(Integer id, ProfissionalDeSaude dados) {
        return repository.findById(id).map(p -> {
            p.setNome(dados.getNome());
            p.setTelefone(dados.getTelefone());
            p.setEndereco(dados.getEndereco());
            p.setCategoria(dados.getCategoria());
            return repository.save(p);
        });
    }

    public Optional<ProfissionalDeSaude> consultarPorId(Integer id) {
        return repository.findById(id);
    }

    public List<ProfissionalDeSaude> consultarPorNome(String nome) {
        return repository.findByNomeContainingIgnoreCase(nome);
    }

    public List<ProfissionalDeSaude> consultarPorCategoria(CategoriaProfissional categoria) {
        return repository.findByCategoria(categoria);
    }

    public List<ProfissionalDeSaude> listarTodos() {
        return repository.findAll();
    }

    public boolean excluir(Integer id) {
        if (!repository.existsById(id)) return false;
        repository.deleteById(id);
        return true;
    }
}
