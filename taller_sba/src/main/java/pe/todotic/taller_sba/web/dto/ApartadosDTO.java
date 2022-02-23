package pe.todotic.taller_sba.web.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ApartadosDTO {
    @NotBlank
    private String fechaInicio;

    @NotBlank
    private String fechaFin;

    private int espacio;

    private int usuario;

    private int estado;
}
