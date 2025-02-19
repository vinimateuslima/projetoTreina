package com.springAPI.springAPI.controllers;

import com.springAPI.springAPI.dtos.CurriculoRecordDto;
import com.springAPI.springAPI.dtos.GraduacaoDto;
import com.springAPI.springAPI.models.Curriculo;
import com.springAPI.springAPI.models.Graduacao;
import com.springAPI.springAPI.services.GraduacaoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/graduacoes")
public class GraduacaoController {

    private final GraduacaoService graduacaoService;

    public GraduacaoController(GraduacaoService graduacaoService) {
        this.graduacaoService = graduacaoService;
    }

    @GetMapping
    public ResponseEntity<List<Graduacao>> buscarTodasGraduacoes() {
        return ResponseEntity.status(HttpStatus.OK).body(graduacaoService.buscarTodasGraduacoes());
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> buscarUmaGraduacao(@PathVariable Long id) {

        try {
            Graduacao graduacao = graduacaoService.buscarGraduacao(id);
            return ResponseEntity.status(HttpStatus.OK).body(graduacao);
        } catch (NoSuchElementException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("mensagem", "Graduação não encontrada!"));
        }


    }

    @PostMapping
    public ResponseEntity<?> cadastrarGraduacao(@RequestBody @Validated GraduacaoDto graduacaoDto) {
        if (graduacaoDto.nome() == "") {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("mensagem", "Os campos não podem estar vázios!"));

        }

        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(graduacaoService.cadastrarGraduacao(graduacaoDto));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("mensagem", "Houve um erro no servidor! " + ex));
        }

    }

}
