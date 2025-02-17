package com.springAPI.springAPI.dtos;

import com.springAPI.springAPI.models.*;

import java.util.Set;

public record CurriculoRecordDto(String nome,
                                 Long telefone,
                                 String foto,
                                 Endereco endereco,
                                 Set<Experiencia> experiencias,
                                 InfoAdicional infoAdicional,
                                 Set<FormacaoDto> formacoes
                                 ) {
}
