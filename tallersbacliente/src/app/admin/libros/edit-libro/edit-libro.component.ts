import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroService } from '../shared/libro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-libro',
  templateUrl: './edit-libro.component.html',
  styleUrls: []
})
export class EditLibroComponent implements OnInit {
  libro: any;

  constructor(
    private libroService: LibroService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.libroService.get(id)
      .subscribe((data: any) => this.libro = data);
  }

  update(libro: any) {
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
        Swal.fire({
          icon: 'success',
          title: 'Exito, la respuesta se envió correctamente.',
          showConfirmButton: false,
          timer: 1500
        })
        this.libroService.update(this.libro.id, libro)
      .subscribe((data) => this.router.navigate(['admin/espacios']));
      }
    })
    
  }

}
