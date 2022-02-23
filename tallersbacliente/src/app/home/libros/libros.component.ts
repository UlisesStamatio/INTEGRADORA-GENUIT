import { Component, OnInit } from '@angular/core';
import { Libro, LibroPage } from '../../admin/libros/shared/libro.model';
import { HomeService } from '../shared/home.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: []
})
export class LibrosComponent implements OnInit {
  libros: Libro[] = [];
  page: number = 0;
  filterPost= '';
  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.homeService.getLibros()
      .subscribe((libroPage: LibroPage) => {
        this.libros = libroPage.content;
        this.page = libroPage.number;
      })
  }

  cargarMasLibros() {
    this.page += 1;

    this.homeService.getLibros(this.page)
      .subscribe((libroPage: LibroPage) => {
        this.libros.push(...libroPage.content);
        this.page = libroPage.number;
      })
  }

}
