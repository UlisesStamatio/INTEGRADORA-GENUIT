package pe.todotic.taller_sba.controller.admin;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pe.todotic.taller_sba.controller.BaseController;
import pe.todotic.taller_sba.model.Apartados;
import pe.todotic.taller_sba.model.Espacio;
import pe.todotic.taller_sba.repo.EspacioRepository;
import pe.todotic.taller_sba.web.dto.EspacioDTO;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@RestController
@RequestMapping("/api/admin/espacios")
public class AdminLibroController extends BaseController {

    private final EspacioRepository espacioRepository;

    @Autowired
    public AdminLibroController(EspacioRepository espacioRepository) {
        this.espacioRepository = espacioRepository;
    }

    @GetMapping
    Page<Espacio> index(@PageableDefault(sort = "titulo", size = 5, direction = Sort.Direction.ASC) Pageable pageable) {
        Page<Espacio> libros = espacioRepository.findAll(pageable);

        libros.forEach(libro -> {
            libro.setUrlPortada(buildUrlString(libro.getRutaPortada()));
        });

        return libros;
    }

    @GetMapping("/listar")
    List<Espacio> listar() {
        List<Espacio> espacios = espacioRepository.findAll();

        espacios.forEach(libro -> {
            libro.setUrlPortada(buildUrlString(libro.getRutaPortada()));
        });
        return espacios;
    }


    @GetMapping("{id}")
    Espacio get(@PathVariable Integer id) {
        Espacio espacio = espacioRepository
                .findById(id)
                .orElseThrow(EntityNotFoundException::new);

        espacio.setUrlPortada(buildUrlString(espacio.getRutaPortada()));

        return espacio;
    }

    @PostMapping
    Espacio crear(@RequestBody @Validated EspacioDTO espacioDTO) {
        Espacio espacio = new ModelMapper().map(espacioDTO, Espacio.class);
        espacio.setStatus(1);
        return espacioRepository.save(espacio);
    }

    @PutMapping("{id}")
    Espacio actualizar(@PathVariable Integer id, @RequestBody @Validated EspacioDTO espacioDTO) {
        Espacio espacioFromDb = espacioRepository
                .findById(id)
                .orElseThrow(EntityNotFoundException::new);

        ModelMapper mapper = new ModelMapper();
        mapper.map(espacioDTO, espacioFromDb);

        return espacioRepository.save(espacioFromDb);
    }


    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id}")
    void eliminar(@PathVariable Integer id) {

        Espacio espacio = espacioRepository
                .findById(id)
                .orElseThrow(EntityNotFoundException::new);
        espacio.setStatus(0);
        espacioRepository.save(espacio);
    }


}
