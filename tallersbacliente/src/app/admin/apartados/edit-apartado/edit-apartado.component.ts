import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { ApartadosService } from '../shared/apartados.service';


@Component({
  selector: 'app-edit-apartado',
  templateUrl: './edit-apartado.component.html',
  styleUrls: []
})
export class EditApartadoComponent implements OnInit {
  libro: any;

  constructor(
    private apartadosService: ApartadosService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.apartadosService.get(id)
      .subscribe((data: any) => this.libro = data);
  }

  update(libro: any) {
    
    Swal.fire({
      title: '¿Estás seguro de enviar la respuesta de la petición?',
      text: "Podrás volverlo a editar más tarde.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, enviar'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.apartadosService.update(this.libro.id, libro)
      .subscribe((data) => this.router.navigate(['admin/apartados']));

        let timerInterval:any
        Swal.fire({
          title: 'La respuesta se está enviando...',
          html: 'Este mensaje se cerrará en unos segundos, por favor espere.',
          timer: 11000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
             
            Swal.fire({
              icon: 'success',
              title: 'Exito, la respuesta se envió correctamente.',
              showConfirmButton: false,
              timer: 1500
            })
          }
      })
      }
    })
    
  }

}
