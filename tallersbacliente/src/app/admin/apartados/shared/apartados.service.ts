import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApartadosPage } from './apartados.model';

@Injectable({
  providedIn: 'root'
})
export class ApartadosService {

  private apiBase: string = environment.apiBase;

  constructor(
    private http: HttpClient
  ) { }

  getAll(page: number = 0, size: number = 5) {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);

    return this.http.get<ApartadosPage>(`${this.apiBase}/admin/apartados`, { params });
  }

  get(id: number) {
    return this.http.get(`${this.apiBase}/admin/apartados/${id}`);
  }


  update(id: number, apartados: any) {
    return this.http.put(`${this.apiBase}/admin/apartados/${id}`, apartados);
  }

}


