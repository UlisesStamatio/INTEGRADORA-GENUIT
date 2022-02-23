import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { IndexComponent } from './index/index.component';
import { LibrosComponent } from './libros/libros.component';
import { DetallesLibroComponent } from './detalles-libro/detalles-libro.component';
import { ApartadosComponent } from './apartados/apartados.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: IndexComponent
      },
      {
        path: 'espacios',
        component: LibrosComponent
      },
      {
        path: 'espacios/:slug',
        component: DetallesLibroComponent
      },
      {
        path: 'apartar/:slug',
        component: ApartadosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
