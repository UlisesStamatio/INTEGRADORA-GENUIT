import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';
import { UsuarioPage } from '../shared/usuario.model';
import { UsuariosService } from '../shared/usuarios.service';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: []
})
export class UsuariosListComponent implements OnInit {
  displayedColumns: string[] = ['nombre','status', 'rol','cargo', 'correo','fechaCreacion', 'acciones'];
  usuarioPage!: UsuarioPage;

  constructor(
    private usuariosService: UsuariosService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.usuariosService.getAll()
      .subscribe((usuarioPage) => this.usuarioPage = usuarioPage);
  }

  delete(usuario: any) {
     
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
          'El usuario se ha desactivado correctamente.',
          'success'
        )
        this.usuariosService.delete(usuario.id)
        .subscribe(() => {
          this.getAll();
        });
      }
    })


  }

  onPaginateChange(event: PageEvent) {
    const page = event.pageIndex;
    const size = event.pageSize;

    this.usuariosService.getAll(page, size)
      .subscribe((usuarioPage) => this.usuarioPage = usuarioPage);
  }

}
