package com.saude.repository;

import com.saude.model.ExameLab;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ExameLabRepository extends JpaRepository<ExameLab, Integer> {
    List<ExameLab> findByAtendimentoId(Integer atendimentoId);
}
