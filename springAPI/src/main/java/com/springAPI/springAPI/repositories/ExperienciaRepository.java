package com.springAPI.springAPI.repositories;

import com.springAPI.springAPI.models.Endereco;
import com.springAPI.springAPI.models.Experiencia;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExperienciaRepository  extends JpaRepository<Experiencia, Long> {
}
