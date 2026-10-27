package br.com.startups.backend.exceptions;

public record ErrorResponse(
        int status,
        String message) {
}
