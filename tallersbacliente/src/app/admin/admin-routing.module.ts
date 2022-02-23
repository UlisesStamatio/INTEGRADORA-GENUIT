import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibroListComponent } from './libros/libro-list/libro-list.component';
import { NewLibroComponent } from './libros/new-libro/new-libro.component';
import { EditLibroComponent } from './libros/edit-libro/edit-libro.component';
import { LayoutComponent } from './layout/layout.component';
import { UsuariosListComponent } from './usuarios/usuarios-list/usuarios-list.component';
import { NewUsuariosComponent } from './usuarios/new-usuarios/new-usuarios.component';
import { EditUsuariosComponent } from './usuarios/edit-usuarios/edit-usuarios.component';
import { ApartadoListComponent } from './apartados/apartado-list/apartado-list.component';
import { EditApartadoComponent } from './apartados/edit-apartado/edit-apartado.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'espacios',
        component: LibroListComponent
      },
      {
        path: 'espacios/nuevo',
        component: NewLibroComponent
      },
      {
        path: 'espacios/:id/editar',
        component: EditLibroComponent
      },
      {
        path: 'usuarios',
        component: UsuariosListComponent
      },
      {
        path: 'usuarios/nuevo',
        component: NewUsuariosComponent
      },
      {
        path: 'usuarios/:id/editar',
        component: EditUsuariosComponent
      },
      {
        path: 'apartados',
        component: ApartadoListComponent
      },
      {
        path: 'apartados/:id/editar',
        component: EditApartadoComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
