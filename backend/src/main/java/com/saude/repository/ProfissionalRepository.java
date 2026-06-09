package com.saude.repository;

import com.saude.model.CategoriaProfissional;
import com.saude.model.ProfissionalDeSaude;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProfissionalRepository extends JpaRepository<ProfissionalDeSaude, Integer> {
    List<ProfissionalDeSaude> findByNomeContainingIgnoreCase(String nome);
    List<ProfissionalDeSaude> findByCategoria(CategoriaProfissional categoria);
}
