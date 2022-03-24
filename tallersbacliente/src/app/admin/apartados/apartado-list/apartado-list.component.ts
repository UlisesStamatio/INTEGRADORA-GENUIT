import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ApartadosService } from '../shared/apartados.service'; 
import Swal from 'sweetalert2';
import { ApartadosPage } from '../shared/apartados.model';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-apartado-list',
  templateUrl: './apartado-list.component.html',
  styleUrls: []
})
export class ApartadoListComponent implements OnInit {
  displayedColumns: string[] = ['Fecha de Inicio', 'Fecha de Fin','usuarioNombre','usuarioCargo','espacioNombre','Estado', 'acciones'];
  apartadosPage!:ApartadosPage;

  constructor(
    private apartadosService: ApartadosService,
    public _MatPaginatorIntl: MatPaginatorIntl
  ) { }

  ngOnInit(): void {
    this.getAll();
    this._MatPaginatorIntl.itemsPerPageLabel = 'Resultados por página';
  }


  getAll() {
    this.apartadosService.getAll()
      .subscribe((apartadosPage) => this.apartadosPage = apartadosPage);
  }

  onPaginateChange(event: PageEvent) {
    const page = event.pageIndex;
    const size = event.pageSize;

    this.apartadosService.getAll(page, size)
      .subscribe((apartadosPage) => this.apartadosPage = apartadosPage);
  }
}
