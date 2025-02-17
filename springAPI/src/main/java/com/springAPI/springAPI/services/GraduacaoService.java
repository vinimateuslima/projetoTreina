package com.springAPI.springAPI.services;

import com.springAPI.springAPI.dtos.GraduacaoDto;
import com.springAPI.springAPI.models.Curriculo;
import com.springAPI.springAPI.models.Graduacao;
import com.springAPI.springAPI.repositories.GraduacaoRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class GraduacaoService {

    private final GraduacaoRepository graduacaoRepository;

    public GraduacaoService(GraduacaoRepository graduacaoRepository) {
        this.graduacaoRepository = graduacaoRepository;
    }

    @Transactional
    public List<Graduacao> buscarTodasGraduacoes() {
        return graduacaoRepository.findAll();
    }

    @Transactional
    public Graduacao buscarGraduacao(Long id) {
        return graduacaoRepository.findById(id).get();
    }

    @Transactional
    public Graduacao cadastrarGraduacao(GraduacaoDto graduacaoDto) {
        Optional<Graduacao> graduacaoExisente = graduacaoRepository.findByNome(graduacaoDto.nome());

        if(graduacaoExisente.isPresent()) {
            throw new RuntimeException("Graduação já existente");
        }

        Graduacao graduacao = new Graduacao();
        graduacao.setNome(graduacaoDto.nome());

        return graduacaoRepository.save(graduacao);

    }

}
