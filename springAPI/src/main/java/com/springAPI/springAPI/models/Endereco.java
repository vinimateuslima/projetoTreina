package com.springAPI.springAPI.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = "Endereco")
public class Endereco {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEndereco;
    @Column(nullable = false)
    private String logradouro;
    @Column(nullable = false, columnDefinition = "INT(11)")
    private int numero;
    @Column(nullable = false, columnDefinition = "CHAR(8)")
    private String cep;
    @Column(nullable = false, length = 100)
    private String bairro;
    @Column(nullable = false, length = 100)
    private String cidade;
    @Column(nullable = false, columnDefinition = "CHAR(2)")

    private String estado;

    @JsonIgnore
    @OneToOne(mappedBy = "endereco", cascade = CascadeType.ALL)
    private Curriculo curriculo;

    public Endereco() {
    }

    public Long getIdEndereco() {
        return idEndereco;
    }

    public void setIdEndereco(Long idEndereco) {
        this.idEndereco = idEndereco;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Curriculo getCurriculo() {
        return curriculo;
    }

    public void setCurriculo(Curriculo curriculo) {
        this.curriculo = curriculo;
    }
}
