import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { Usuario } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }


  login(email: string, password: string) {
    return this.http.post(environment.loginUrl, { username: email, password })
      .pipe(map((response: any) => {
        const expiresAt = moment().add(response['expiresIn'], 'second');

        localStorage.setItem('app_user_id', response['userId']);
        localStorage.setItem('app_name', response['name']);
        localStorage.setItem('app_role', response['role']);
        localStorage.setItem('app_token', response['token']);
        localStorage.setItem('app_expires_at', JSON.stringify(expiresAt.valueOf()));

        return response;
      }))
  }

  registrar(usuario: Usuario) {
    return this.http.post(`${environment.apiBase}/auth/registrar`, usuario);
  }

  getName() {
    return localStorage.getItem('app_name') || '';
  }

  getToken() {
    return localStorage.getItem('app_token');
  }

  getId(){
    return localStorage.getItem('app_user_id');
  }


  isAdmin() {
    return localStorage.getItem('app_role') == 'ADMIN';
  }

  isLoggedIn() {
    const expiration = localStorage.getItem('app_expires_at');

    if (expiration) {
      const expiresAt = JSON.parse(expiration);
      return moment().isBefore(moment(expiresAt));
    }
    return false;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  logout() {
    localStorage.removeItem('app_user_id');
    localStorage.removeItem('app_name');
    localStorage.removeItem('app_role');
    localStorage.removeItem('app_token');
    localStorage.removeItem('app_expires_at');
  }

  verificarEmail(email: string) {
    return this.http.get(`${environment.apiBase}/auth/verificar-email?email=${email}`);
  }

}
