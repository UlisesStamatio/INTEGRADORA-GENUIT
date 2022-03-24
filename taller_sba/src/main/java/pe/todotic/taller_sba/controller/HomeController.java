package pe.todotic.taller_sba.controller;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pe.todotic.taller_sba.model.Apartados;
import pe.todotic.taller_sba.model.Espacio;
import pe.todotic.taller_sba.repo.ApartadosRepository;
import pe.todotic.taller_sba.repo.EspacioRepository;
import pe.todotic.taller_sba.repo.UsuarioRepository;
import pe.todotic.taller_sba.service.FileSystemStorageService;
import pe.todotic.taller_sba.web.dto.ApartadosDTO;

import javax.persistence.EntityNotFoundException;
import java.util.List;


@Slf4j
@RestController
@RequestMapping("/api")
public class HomeController extends BaseController {

    private final EspacioRepository espacioRepository;
    private final FileSystemStorageService fileSystemStorageService;
    private final ApartadosRepository apartadosRepository;
    private final UsuarioRepository usuarioRepository;

    @Autowired
    public HomeController(EspacioRepository espacioRepository,
                          FileSystemStorageService fileSystemStorageService, ApartadosRepository apartadosRepository, UsuarioRepository usuarioRepository) {
        this.espacioRepository = espacioRepository;
        this.fileSystemStorageService = fileSystemStorageService;
        this.apartadosRepository = apartadosRepository;
        this.usuarioRepository = usuarioRepository;
    }

    /**
     * @return los 6 últimos libros
     */
    @GetMapping("/ultimos-espacios")
    List<Espacio> index() {
        List<Espacio> espacios = espacioRepository.findAllByStatusEquals(1);
        espacios.forEach(l -> l.setUrlPortada(buildUrlString(l.getRutaPortada())));
        return espacios;
    }

    @GetMapping("/espacios")
    Page<Espacio> getLibros(@PageableDefault(sort = "titulo", size = 10) Pageable pageable) {
        Page<Espacio> libros = espacioRepository.findAllByStatusEquals(1,pageable);
        libros.forEach(libro -> {
            libro.setUrlPortada(buildUrlString(libro.getRutaPortada()));
        });
        return libros;
    }

    @GetMapping("/espacios/{slug}")
    Espacio getLibro(@PathVariable String slug) {
        Espacio espacio = espacioRepository.findBySlug(slug)
                .orElseThrow(EntityNotFoundException::new);
        espacio.setUrlPortada(buildUrlString(espacio.getRutaPortada()));

        return espacio;
    }


    @PostMapping("/apartar")
    Apartados crear(@RequestBody @Validated ApartadosDTO apartadosDTO) {
        Apartados apartados = new ModelMapper().map(apartadosDTO, Apartados.class);

        if(apartados.getFechaInicio().equals(apartados.getFechaFin())){
            return null;
        }

        apartados.setEspacio(espacioRepository.getById(apartadosDTO.getEspacio()));
        apartados.setUsuario(usuarioRepository.getById(apartadosDTO.getUsuario()));
        apartados.setEstado(1);
        return apartadosRepository.save(apartados);
    }





}
