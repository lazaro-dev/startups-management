package br.com.startups.backend.modules.estado.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import br.com.startups.backend.modules.estado.dto.EstadoDTO;
import br.com.startups.backend.modules.estado.dto.EstadoRequestDTO;
import br.com.startups.backend.modules.estado.entity.Estado;
import br.com.startups.backend.modules.estado.repository.EstadoRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class EstadoService {

    private final EstadoRepository estadoRepository;

    @Transactional(readOnly = true)
    public List<EstadoDTO> findAll() {
        return estadoRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public EstadoDTO findByUf(String uf) {
        Estado estado = getEstadoOrThrow(normalizeUf(uf));
        return toDTO(estado);
    }

    @Transactional
    public EstadoDTO create(EstadoRequestDTO request) {
        String uf = normalizeUf(request.uf());

        if (estadoRepository.existsById(uf)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "A state with UF " + uf + " already exists.");
        }

        Estado estado = new Estado(uf, request.description().trim());

        return toDTO(estadoRepository.save(estado));
    }

    @Transactional
    public EstadoDTO update(String uf, EstadoRequestDTO request) {
        String normalizedUf = normalizeUf(uf);
        String requestUf = normalizeUf(request.uf());

        if (!normalizedUf.equals(requestUf)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "The UF in the URL must match the UF in the request body.");
        }

        Estado estado = getEstadoOrThrow(normalizedUf);
        estado.setDescription(request.description().trim());

        return toDTO(estadoRepository.save(estado));
    }

    @Transactional
    public void delete(String uf) {
        Estado estado = getEstadoOrThrow(normalizeUf(uf));
        estadoRepository.delete(estado);
    }

    private Estado getEstadoOrThrow(String uf) {
        return estadoRepository.findById(uf)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "State with UF " + uf + " was not found."));
    }

    private String normalizeUf(String uf) {
        return uf.trim().toUpperCase(Locale.ROOT);
    }

    private EstadoDTO toDTO(Estado estado) {
        return new EstadoDTO(
                estado.getUf().trim(),
                estado.getDescription());
    }
}