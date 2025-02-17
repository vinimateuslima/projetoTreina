package com.springAPI.springAPI.controllers;

import com.springAPI.springAPI.dtos.CurriculoRecordDto;
import com.springAPI.springAPI.models.Curriculo;
import com.springAPI.springAPI.models.Endereco;
import com.springAPI.springAPI.models.Experiencia;
import com.springAPI.springAPI.repositories.CurriculoRepository;
import com.springAPI.springAPI.repositories.EnderecoRepository;
import com.springAPI.springAPI.repositories.ExperienciaRepository;
import com.springAPI.springAPI.services.CurriculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping(value = "/curriculos")
public class CurriculoController {

    private final CurriculoService curriculoService;

    public CurriculoController(CurriculoService curriculoService) {
        this.curriculoService = curriculoService;
    }

    @GetMapping
    public ResponseEntity<List<Curriculo>> buscarTodosOsCurriculos() {
        return ResponseEntity.status(HttpStatus.OK).body(curriculoService.buscarTodosOsCurriculos());
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> buscarCurriculo(@PathVariable Long id) {

        try {
            Curriculo curriculo = curriculoService.buscarCurriculo(id);
            return ResponseEntity.status(HttpStatus.OK).body(curriculo);
        } catch (NoSuchElementException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("mensagem", "Curriculo não encontrado!"));
        }


    }

    @PostMapping
    public ResponseEntity<?> cadastrarCurriculo(@RequestBody @Validated CurriculoRecordDto curriculoRecordDto) {


        if (curriculoRecordDto.nome().isBlank() || curriculoRecordDto.foto().isBlank() || curriculoRecordDto.telefone() == null || curriculoRecordDto.endereco() == null || curriculoRecordDto.formacoes() == null || curriculoRecordDto.experiencias() == null || curriculoRecordDto.infoAdicional() == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("mensagem", "Os campos não podem estar vázios!"));

        }


        if (String.valueOf(curriculoRecordDto.telefone()).length() != 11) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("mensagem", "Preencha o telefone corretamente!"));
        }


        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(curriculoService.cadastrarCurriculo(curriculoRecordDto));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("mensagem", "Houve um erro no servidor! " + ex));
        }


    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<?> atualizarCurriculo(@PathVariable Long id, @RequestBody @Validated CurriculoRecordDto curriculoRecordDto) {


        return ResponseEntity.status(HttpStatus.OK).body(curriculoService.atualizarCurriculo(id, curriculoRecordDto));


    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> deletarCurriculo(@PathVariable Long id) {
        try {
            curriculoService.deletarCurriculo(id);
            return ResponseEntity.status(HttpStatus.OK).body("Currículo deletado com sucesso!");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }


}
