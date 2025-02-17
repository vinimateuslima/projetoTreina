package com.springAPI.springAPI.repositories;

import com.springAPI.springAPI.models.Curriculo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CurriculoRepository extends JpaRepository<Curriculo, Long> {
}
