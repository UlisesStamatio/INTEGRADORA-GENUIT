import { Component, OnInit } from '@angular/core';
import { HomeService } from '../shared/home.service';
import { Libro } from '../../admin/libros/shared/libro.model';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detalles-libro',
  templateUrl: './detalles-libro.component.html',
  styleUrls: []
})
export class DetallesLibroComponent implements OnInit {
  libro!: Libro;

  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug')!;

    this.homeService.getLibro(slug)
      .subscribe(libro => this.libro = libro);
  }

  agregarACarrito(libro: Libro) {
    this.snackBar.open('Ítem agregado al carrito', 'Cerrar', {
      duration: 3 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  libroYaEstaAgregado(libro: Libro) {
  }

}
