package br.com.startups.backend.modules.estado.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.startups.backend.modules.estado.entity.Estado;

public interface EstadoRepository extends JpaRepository<Estado, String> {
}