import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LibroService } from '../shared/libro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-libro',
  templateUrl: './new-libro.component.html',
  styleUrls: []
})
export class NewLibroComponent implements OnInit {
  

  constructor(
    private libroService: LibroService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  create(libro: any) {
    Swal.fire({
      title: '¿Estás seguro de crear el espacio?',
      text: "Podrás desactivarlo más tarde.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, crear'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Exito, la respuesta se envió correctamente.',
          showConfirmButton: false,
          timer: 1500
        })
        this.libroService.create(libro)
      .subscribe(data => {
        this.router.navigate(['admin', 'espacios'])
      }, error => {
        if (error.status == 422) {
          // this.errors = error.error.errors;
        }
      });
      }
    })
    
  }

}
