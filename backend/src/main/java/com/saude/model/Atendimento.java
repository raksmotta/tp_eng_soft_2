package com.saude.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "atendimento")
public class Atendimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private LocalDate data;
    private LocalTime horario;
    private String problemaTexto;

    @Enumerated(EnumType.STRING)
    private TipoReceita receitaSaude;

    @ManyToOne
    @JoinColumn(name = "profissional_id")
    private ProfissionalDeSaude profissional;

    @ManyToOne
    @JoinColumn(name = "paciente_id")
    private Paciente paciente;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public LocalDate getData() { return data; }
    public void setData(LocalDate data) { this.data = data; }
    public LocalTime getHorario() { return horario; }
    public void setHorario(LocalTime horario) { this.horario = horario; }
    public String getProblemaTexto() { return problemaTexto; }
    public void setProblemaTexto(String problemaTexto) { this.problemaTexto = problemaTexto; }
    public TipoReceita getReceitaSaude() { return receitaSaude; }
    public void setReceitaSaude(TipoReceita receitaSaude) { this.receitaSaude = receitaSaude; }
    public ProfissionalDeSaude getProfissional() { return profissional; }
    public void setProfissional(ProfissionalDeSaude profissional) { this.profissional = profissional; }
    public Paciente getPaciente() { return paciente; }
    public void setPaciente(Paciente paciente) { this.paciente = paciente; }
}
