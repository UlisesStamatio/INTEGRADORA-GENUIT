import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UsuarioPage } from './usuario.model';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiBase: string = environment.apiBase;  

  constructor(
    private http: HttpClient
  ) { }


  getAll(page: number = 0, size: number = 5) {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    params = params.append('sort', 'fechaCreacion,desc');

    return this.http.get<UsuarioPage>(`${this.apiBase}/admin/usuarios`, { params });
  }

  get(id: number) {
    return this.http.get(`${this.apiBase}/admin/usuarios/${id}`);
  }

  create(usuario: any) {
    return this.http.post(`${this.apiBase}/admin/usuarios`, usuario);
  }

  update(id: number, usuario: any) {
    return this.http.put(`${this.apiBase}/admin/usuarios/${id}`, usuario);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiBase}/admin/usuarios/${id}`);
  }

}
