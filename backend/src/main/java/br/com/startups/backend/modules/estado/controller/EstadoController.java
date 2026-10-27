package br.com.startups.backend.modules.estado.controller;

import br.com.startups.backend.modules.estado.dto.EstadoDTO;
import br.com.startups.backend.modules.estado.dto.EstadoRequestDTO;
import br.com.startups.backend.modules.estado.service.EstadoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/estados")
@RequiredArgsConstructor
public class EstadoController {

    @Autowired
    private final EstadoService estadoService;

    @GetMapping
    public List<EstadoDTO> findAll() {
        return estadoService.findAll();
    }

    @GetMapping("/{uf}")
    public EstadoDTO findByUf(@PathVariable String uf) {
        return estadoService.findByUf(uf);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EstadoDTO create(@Valid @RequestBody EstadoRequestDTO request) {
        return estadoService.create(request);
    }

    @PutMapping("/{uf}")
    public EstadoDTO update(
            @PathVariable String uf,
            @Valid @RequestBody EstadoRequestDTO request) {
        return estadoService.update(uf, request);
    }

    @DeleteMapping("/{uf}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String uf) {
        estadoService.delete(uf);
    }
}
