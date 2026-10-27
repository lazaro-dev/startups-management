package br.com.startups.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class EstadoNotFoundException extends RuntimeException {
    public EstadoNotFoundException(String message) {
        super(message != null ? message : "Estado não encontrado");
    }
}
