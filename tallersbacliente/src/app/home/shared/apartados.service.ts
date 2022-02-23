import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApartadosService {

  private apiBase: string = environment.apiBase;

  constructor(
    private http: HttpClient
  ) { }

  create(apartados: any) {
    return this.http.post(`${this.apiBase}/apartar`, apartados);
  }


}
