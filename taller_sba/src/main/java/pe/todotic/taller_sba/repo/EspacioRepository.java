package pe.todotic.taller_sba.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.todotic.taller_sba.model.Espacio;

import java.util.List;
import java.util.Optional;

@Repository
public interface EspacioRepository extends JpaRepository<Espacio, Integer> {

    Optional<Espacio> findBySlug(String slug);
    List<Espacio> findAllByStatusEquals(int a);
    Page<Espacio> findAllByStatusEquals(int status, Pageable pageable);
}
