package com.springAPI.springAPI.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "Formacao")
public class Formacao implements Serializable {
    private static final long serialVersionUID = 1L;
    @Column(nullable = false)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idFormacao;

    @Column(nullable = false)
    private String instituicao;
    @Column(nullable = false, length = 250)
    private String curso;

    @Column(nullable = false, columnDefinition = "YEAR")
    private int anoInicio;

    @Column(nullable = false, columnDefinition = "YEAR")
    private int anoTermino;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_idCurriculo")
    private Curriculo curriculo;

    @ManyToOne
    @JoinColumn(name = "fk_idGraduacao")
    private Graduacao graduacao;

    public Long getIdFormacao() {
        return idFormacao;
    }

    public void setIdFormacao(Long idFormacao) {
        this.idFormacao = idFormacao;
    }

    public String getInstituicao() {
        return instituicao;
    }

    public void setInstituicao(String instituicao) {
        this.instituicao = instituicao;
    }

    public String getCurso() {
        return curso;
    }

    public void setCurso(String curso) {
        this.curso = curso;
    }

    public int getAnoInicio() {
        return anoInicio;
    }

    public void setAnoInicio(int anoInicio) {
        this.anoInicio = anoInicio;
    }

    public int getAnoTermino() {
        return anoTermino;
    }

    public void setAnoTermino(int anoTermino) {
        this.anoTermino = anoTermino;
    }

    public Curriculo getCurriculo() {
        return curriculo;
    }

    public void setCurriculo(Curriculo curriculo) {
        this.curriculo = curriculo;
    }

    public Graduacao getGraduacao() {
        return graduacao;
    }

    public void setGraduacao(Graduacao graduacao) {
        this.graduacao = graduacao;
    }
}
