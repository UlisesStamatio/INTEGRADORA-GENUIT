import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibroListComponent } from './libros/libro-list/libro-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NewLibroComponent } from './libros/new-libro/new-libro.component';
import { EditLibroComponent } from './libros/edit-libro/edit-libro.component';
import { MaterialModule } from '../material/material.module';
import { FormLibroComponent } from './libros/shared/form-libro/form-libro.component';
import { LayoutComponent } from './layout/layout.component';
import { EditUsuariosComponent } from './usuarios/edit-usuarios/edit-usuarios.component';
import { UsuariosListComponent } from './usuarios/usuarios-list/usuarios-list.component';
import { NewUsuariosComponent } from './usuarios/new-usuarios/new-usuarios.component';
import { FormUsuarioComponent } from './usuarios/shared/form-usuario/form-usuario.component';
import { ApartadoListComponent } from './apartados/apartado-list/apartado-list.component';
import { EditApartadoComponent } from './apartados/edit-apartado/edit-apartado.component';
import { FormApartadoComponent } from './apartados/shared/form-apartado/form-apartado.component';


@NgModule({
  declarations: [
    LibroListComponent,
    NewLibroComponent,
    EditLibroComponent,
    FormLibroComponent,
    LayoutComponent,
    EditUsuariosComponent,
    UsuariosListComponent,
    NewUsuariosComponent,
    FormUsuarioComponent,
    ApartadoListComponent,
    EditApartadoComponent,
    FormApartadoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    HttpClientModule,
    MaterialModule
  ]
})
export class AdminModule { }
