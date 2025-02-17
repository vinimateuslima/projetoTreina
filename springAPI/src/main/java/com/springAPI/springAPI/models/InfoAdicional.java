package com.springAPI.springAPI.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "InfoAdicional")
public class InfoAdicional {

    @Column(nullable = false)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idInfoAdicional;

    @Column(nullable = false, length = 512)
    private String linkedin;

    @Column(nullable = false, length = 512)
    private String github;

    @Column(nullable = false, length = 512)
    private String instagram;

    @Column(nullable = false, length = 512)
    private String portfolio;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_idCurriculo")
    private Curriculo curriculo;

    public Long getIdInfoAdicional() {
        return idInfoAdicional;
    }

    public void setIdInfoAdicional(Long idInfoAdicional) {
        this.idInfoAdicional = idInfoAdicional;
    }

    public String getLinkedin() {
        return linkedin;
    }

    public void setLinkedin(String linkedin) {
        this.linkedin = linkedin;
    }

    public String getGithub() {
        return github;
    }

    public void setGithub(String github) {
        this.github = github;
    }

    public String getInstagram() {
        return instagram;
    }

    public void setInstagram(String instagram) {
        this.instagram = instagram;
    }

    public String getPortfolio() {
        return portfolio;
    }

    public void setPortfolio(String portfolio) {
        this.portfolio = portfolio;
    }

    public Curriculo getCurriculo() {
        return curriculo;
    }

    public void setCurriculo(Curriculo curriculo) {
        this.curriculo = curriculo;
    }
}
