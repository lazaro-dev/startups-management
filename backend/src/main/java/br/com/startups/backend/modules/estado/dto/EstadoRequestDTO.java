package br.com.startups.backend.modules.estado.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record EstadoRequestDTO(

    @NotBlank(message = "O estado UF é obrigatório.")
    @Size(min = 2, max = 2, message = "O estado UF deve conter 2 letras.")
    @Pattern(regexp = "[a-zA-Z]{2}", message = "O estado UF deve conter apenas letras.")
    String uf,

    @NotBlank(message = "A descrição do estado é obrigatória.")
    @Size(max = 40, message = "A descrição do estado deve ter no máximo 40 caracteres.")
    String description

) {
}