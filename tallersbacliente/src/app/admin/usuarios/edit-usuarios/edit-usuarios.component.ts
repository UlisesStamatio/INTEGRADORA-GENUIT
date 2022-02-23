import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../shared/usuarios.service';
@Component({
  selector: 'app-edit-usuarios',
  templateUrl: './edit-usuarios.component.html',
  styleUrls: []
})
export class EditUsuariosComponent implements OnInit {

  usuario: any;

  constructor(
    private usuarioService: UsuariosService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.usuarioService.get(id)
      .subscribe((data: any) => this.usuario = data);
  }


  update(usuario: any) {
    Swal.fire({
      title: '¿Estás seguro de actualizar los datos?',
      text: "Podrás volverlo a editar más tarde.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, actualizar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Éxito!',
          'El usuario se ha actualizado correctamente.',
          'success'
        )
        this.usuarioService.update(this.usuario.id, usuario)
      .subscribe((data) => this.router.navigate(['admin/usuarios']));
      }
    })
    
  }
}
