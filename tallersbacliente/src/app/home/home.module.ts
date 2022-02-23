import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { LayoutComponent } from './layout/layout.component';
import { IndexComponent } from './index/index.component';
import { HomeRoutingModule } from './home-routing.module';
import { LibrosComponent } from './libros/libros.component';
import { DetallesLibroComponent } from './detalles-libro/detalles-libro.component';
import { LibroCardComponent } from './libro-card/libro-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FilterPipe } from './pipes/filter.pipe';
import { FormApartadosComponent } from './shared/form-apartados/form-apartados.component';
import { ApartadosComponent } from './apartados/apartados.component';



@NgModule({
  declarations: [
    LayoutComponent,
    IndexComponent,
    LibrosComponent,
    DetallesLibroComponent,
    LibroCardComponent,
    FilterPipe,
    FormApartadosComponent,
    ApartadosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    HomeRoutingModule,
    InfiniteScrollModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
