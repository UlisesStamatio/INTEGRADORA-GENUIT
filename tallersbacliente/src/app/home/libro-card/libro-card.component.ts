import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Libro } from '../../admin/libros/shared/libro.model';

@Component({
  selector: 'app-libro-card',
  templateUrl: './libro-card.component.html',
  styleUrls: []
})
export class LibroCardComponent implements OnInit {

  @Input() libro!: Libro;

  constructor(
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  agregarACarrito(libro: Libro) {
    ///se agrega
    this.snackBar.open('Ítem agregado al carrito', 'Cerrar', {
      duration: 3 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  libroYaEstaAgregado(libro: Libro) {
    ///el item ya esta reservado
  } 

}
