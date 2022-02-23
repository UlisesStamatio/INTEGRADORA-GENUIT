package pe.todotic.taller_sba.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import pe.todotic.taller_sba.model.Apartados;

import java.util.List;


public interface ApartadosRepository   extends JpaRepository<Apartados, Integer> {
    List<Apartados> findAllByUsuarioEquals(int a);
    Page<Apartados> findAll(Pageable pageable);
}
