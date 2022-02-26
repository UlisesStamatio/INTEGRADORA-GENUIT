package pe.todotic.taller_sba.web.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;

@Data
public class EspacioDTO {
    @NotBlank
    private String titulo;

    @NotBlank
    private String slug;

    @NotBlank
    private String descripcion;

    @NotBlank
    private String rutaPortada;

    @NotBlank
    private String direccion;

    @NotNull
    @PositiveOrZero
    private int cupos;

    @NotNull
    @PositiveOrZero
    private int equipos;

    @NotNull
    @PositiveOrZero
    private int proyectores;


    private int status;

}
