import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LibroPage } from './libro.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private apiBase: string = environment.apiBase;

  constructor(
    private http: HttpClient
  ) { }


  getAll(page: number = 0, size: number = 5) {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    params = params.append('sort', 'fechaCreacion,desc');

    return this.http.get<LibroPage>(`${this.apiBase}/admin/espacios`, { params });
  }

  get(id: number) {
    return this.http.get(`${this.apiBase}/admin/espacios/${id}`);
  }

  create(libro: any) {
    return this.http.post(`${this.apiBase}/admin/espacios`, libro);
  }

  update(id: number, libro: any) {
    return this.http.put(`${this.apiBase}/admin/espacios/${id}`, libro);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiBase}/admin/espacios/${id}`);
  }

  uploadFile(formData: FormData) {
    return this.http.post(`${this.apiBase}/assets/upload`, formData);
  }

}
