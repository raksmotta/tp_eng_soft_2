package com.saude.repository;

import com.saude.model.Atendimento;
import com.saude.model.TipoReceita;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface AtendimentoRepository extends JpaRepository<Atendimento, Integer> {
    List<Atendimento> findByData(LocalDate data);
    List<Atendimento> findByProfissionalId(Integer profissionalId);
    List<Atendimento> findByReceitaSaude(TipoReceita receita);
}
