package com.springAPI.springAPI.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import org.springframework.lang.NonNull;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Curriculo")
public class Curriculo implements Serializable {
    private static final long serialVersionUID = 1L;


    @Column(nullable = false)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCurriculo;



    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, columnDefinition = "CHAR(11)")
    private Long telefone;


    @Column(nullable = false, columnDefinition = "TEXT")
    private String foto;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_idEndereco", nullable = false)
    private Endereco endereco;
   // @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @OneToMany(mappedBy = "curriculo", cascade = CascadeType.ALL)
    private Set<Experiencia> experiencias = new HashSet<>();

    @OneToMany(mappedBy = "curriculo", cascade = CascadeType.ALL)
    private Set<Formacao> formacoes = new HashSet<>();

    @OneToOne(mappedBy = "curriculo", cascade = CascadeType.ALL)
    private InfoAdicional infoAdicional;



    public Curriculo() {

    }

    public Long getIdCurriculo() {
        return idCurriculo;
    }

    public void setIdCurriculo(Long idCurriculo) {
        this.idCurriculo = idCurriculo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getTelefone() {
        return telefone;
    }

    public void setTelefone(Long telefone) {
        this.telefone = telefone;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public com.springAPI.springAPI.models.Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(com.springAPI.springAPI.models.Endereco endereco) {
        this.endereco = endereco;
    }

    public Set<Experiencia> getExperiencias() {
        return experiencias;
    }

    public void setExperiencias(Set<Experiencia> experiencias) {
        this.experiencias = experiencias;
    }

    public Set<Formacao> getFormacoes() {
        return formacoes;
    }

    public void setFormacoes(Set<Formacao> formacoes) {
        this.formacoes = formacoes;
    }

    public InfoAdicional getInfoAdicional() {
        return infoAdicional;
    }

    public void setInfoAdicional(InfoAdicional infoAdicional) {
        this.infoAdicional = infoAdicional;
    }
}
