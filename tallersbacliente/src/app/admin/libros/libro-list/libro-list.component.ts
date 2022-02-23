import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LibroPage } from '../shared/libro.model';
import { LibroService } from '../shared/libro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-libro-list',
  templateUrl: './libro-list.component.html',
  styleUrls: []
})
export class LibroListComponent implements OnInit {
  displayedColumns: string[] = ['titulo','status', 'cupos','equipos','proyectores', 'fechaCreacion', 'acciones'];
  libroPage!: LibroPage;

  constructor(
    private libroService: LibroService
  ) {
  }


  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.libroService.getAll()
      .subscribe((libroPage) => this.libroPage = libroPage);
  }

  delete(libro: any) {
     
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Podrás volverlo a activar desde la pestaña editar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, desactivar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Desactivado!',
          'El espacio se ha desactivado correctamente.',
          'success'
        )
        this.libroService.delete(libro.id)
        .subscribe(() => {
          this.getAll();
        });
      }
    })


  }

  onPaginateChange(event: PageEvent) {
    const page = event.pageIndex;
    const size = event.pageSize;

    this.libroService.getAll(page, size)
      .subscribe((libroPage) => this.libroPage = libroPage);
  }

}
