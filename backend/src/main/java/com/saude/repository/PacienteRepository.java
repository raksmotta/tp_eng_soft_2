package com.saude.repository;

import com.saude.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PacienteRepository extends JpaRepository<Paciente, Integer> {
    List<Paciente> findByNomeContainingIgnoreCase(String nome);
}
