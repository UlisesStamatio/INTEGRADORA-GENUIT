package pe.todotic.taller_sba.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
public class Espacio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idlibro")
    private Integer id;

    private String titulo;
    private String slug;
    private String descripcion;
    private String rutaPortada;
    private String direccion;
    private LocalDateTime fechaCreacion;
    private int cupos;
    private int equipos;
    private int proyectores;
    private int status;

    @Column(name = "fecha_act")
    private LocalDateTime fechaActualizacion;

    @Transient
    private String urlPortada;

    @Transient
    private String urlArchivo;

    @PrePersist
    void asignarFechaCreacion() {
        fechaCreacion = LocalDateTime.now();
    }

    @PreUpdate
    void asignarFechaActualizacion() {
        fechaActualizacion = LocalDateTime.now();
    }

    public int getStatus() {
        return status;
    }
}
