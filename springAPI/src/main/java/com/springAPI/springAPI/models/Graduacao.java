package com.springAPI.springAPI.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Graduacao")
public class Graduacao implements Serializable {
    private static final long serialVersionUID = 1L;
    @Column(nullable = false)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idGraduacao;

    @Column(nullable = false, length = 50)
    private String nome;
    @JsonIgnore
    @OneToMany(mappedBy = "graduacao")
    private Set<Formacao> formacoes;

    public Long getIdGraduacao() {
        return idGraduacao;
    }

    public void setIdGraduacao(Long idGraduacao) {
        this.idGraduacao = idGraduacao;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<Formacao> getFormacoes() {
        return formacoes;
    }

    public void setFormacoes(Set<Formacao> formacoes) {
        this.formacoes = formacoes;
    }
}
