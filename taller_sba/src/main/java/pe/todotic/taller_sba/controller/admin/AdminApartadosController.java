package pe.todotic.taller_sba.controller.admin;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pe.todotic.taller_sba.controller.BaseController;
import pe.todotic.taller_sba.model.Apartados;
import pe.todotic.taller_sba.repo.ApartadosRepository;
import pe.todotic.taller_sba.service.EmailSenderService;
import pe.todotic.taller_sba.web.dto.ApartadosDTO;


import javax.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/admin/apartados")
public class AdminApartadosController extends BaseController {

    private final ApartadosRepository apartadosRepository;

    @Autowired
    private EmailSenderService senderService;

    @Autowired
    public AdminApartadosController(ApartadosRepository apartadosRepository) {
        this.apartadosRepository = apartadosRepository;
    }


    @GetMapping
    Page<Apartados> index(@PageableDefault(size = 5, direction = Sort.Direction.ASC) Pageable pageable) {
        Page<Apartados> apartados = apartadosRepository.findAll(pageable);
        return apartados;
    }

    @GetMapping("{id}")
    Apartados get(@PathVariable Integer id) {
        Apartados apartados = apartadosRepository
                .findById(id)
                .orElseThrow(EntityNotFoundException::new);
        return apartados;
    }

    @PutMapping("{id}")
    Apartados actualizar(@PathVariable Integer id, @RequestBody @Validated ApartadosDTO apartadosDTO) {
        Apartados apartadoFromDb = apartadosRepository
                .findById(id)
                .orElseThrow(EntityNotFoundException::new);
        ModelMapper mapper = new ModelMapper();
        mapper.map(apartadosDTO, apartadoFromDb);

        String body="Tu solicitud ha sido respondida y fue";
        String cadena="";

        switch (apartadoFromDb.getEstado()){
            case 0:
                cadena=" rechazada";
                break;
            case 1:
                cadena=" puesta en pendiente";
                break;
            case 2:
                cadena=" aceptada";
                break;
        }
        body=body+cadena;

        sendEmail(apartadoFromDb.getUsuario().getEmail(),"Tu petición ha sido respondida",body);

        return apartadosRepository.save(apartadoFromDb);
    }


    public void sendEmail(String email,String subject, String body){
        senderService.sendEmail(email,subject,body);
    }
}
