package pe.todotic.taller_sba.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Apartados {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idApartado")
    private Integer id;
    private String fechaInicio;
    private String fechaFin;

    @ManyToOne(fetch = FetchType.LAZY) //relacion en la base de datos muchos apartados para una sala
    @JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
    @JoinColumn(name = "espacio_id")
    private Espacio espacio;

    @ManyToOne(fetch = FetchType.LAZY) //relacion en la base de datos muchos apartados para una sala
    @JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    private int estado;
}
