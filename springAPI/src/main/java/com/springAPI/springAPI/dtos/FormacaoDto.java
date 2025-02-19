package com.springAPI.springAPI.dtos;

import com.springAPI.springAPI.models.Formacao;

import java.util.Set;

public record FormacaoDto(

        String instituicao,
        String curso,
        int anoInicio,
        int anoTermino,
        Long idGraduacao


) {
}
