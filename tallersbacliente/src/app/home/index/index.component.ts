import { Component, OnInit } from '@angular/core';
import { HomeService } from '../shared/home.service';
import { Libro } from '../../admin/libros/shared/libro.model';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: []
})
export class IndexComponent implements OnInit {
  ultimosLibros!: Libro[];
  filterPost= '';
  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.homeService.getUltimosLibros()
      .subscribe(libros => this.ultimosLibros = libros );
  }


}
