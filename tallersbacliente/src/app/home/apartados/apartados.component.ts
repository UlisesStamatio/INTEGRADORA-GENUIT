import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApartadosService } from '../shared/apartados.service'; 
import { LibroService } from 'src/app/admin/libros/shared/libro.service';
import { HomeService } from '../shared/home.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-apartados',
  templateUrl: './apartados.component.html',
  styleUrls: []
})
export class ApartadosComponent implements OnInit {
  libro: any;

  constructor(
    private homeService: HomeService,
    private libroService: LibroService,
    private apartadosService: ApartadosService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    
    const slug = this.route.snapshot.paramMap.get('slug')!;

    this.homeService.getLibro(slug)
      .subscribe(libro => this.libro = libro);
    
  }

  create(apartados: any) {
    Swal.fire({
      title: '¿Estás seguro de reservar el espacio?',
      text: "Tu petición será enviada.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, reservar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Éxito!',
          'Se ha enviado la petición correctamente.',
          'success'
        )
        this.apartadosService.create(apartados)
      .subscribe(data => {
        this.router.navigate(['/'])
      }, error => {
        if (error.status == 422) {
          // this.errors = error.error.errors;
        }
      });
      }
    })
    
  }

}
