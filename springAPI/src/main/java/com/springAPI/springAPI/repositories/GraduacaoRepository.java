package com.springAPI.springAPI.repositories;

import com.springAPI.springAPI.models.Graduacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GraduacaoRepository extends JpaRepository<Graduacao, Long> {

    Optional<Graduacao> findByNome(String nome);

}
