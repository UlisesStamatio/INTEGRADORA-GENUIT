import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuariosService } from '../shared/usuarios.service';
@Component({
  selector: 'app-new-usuarios',
  templateUrl: './new-usuarios.component.html',
  styleUrls: []
})
export class NewUsuariosComponent implements OnInit {

  constructor(
    private router: Router,
    private usuarioService: UsuariosService,
  ) { }

  ngOnInit(): void {
  }

  create(usuario: any) {
    Swal.fire({
      title: '¿Estás seguro de crear el usuario?',
      text: "Podrás desactivarlo más tarde.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, crear'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Éxito!',
          'El usuario se ha creado correctamente.',
          'success'
        )
        this.usuarioService.create(usuario)
      .subscribe(data => {
        this.router.navigate(['admin', 'usuarios'])
      }, error => {
        if (error.status == 422) {
          // this.errors = error.error.errors;
        }
      });
      }
    })
    
  }
}
