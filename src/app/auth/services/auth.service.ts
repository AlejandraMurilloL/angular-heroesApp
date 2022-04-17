import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario: Usuario | undefined;

  get usuario() {
    return {...this._usuario!};
  }

  constructor(private http: HttpClient) { }

  validarAutenticacion(): Observable<boolean> {

    if (!localStorage.getItem('token')) {
      return of(false);
    }

    return this.http.get<Usuario>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        map(usuario => {
          this._usuario = usuario
          return true;
        })
      );
  }

  login(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        tap(usuario => { this._usuario = usuario;}),
        tap(usuario => { localStorage.setItem('token', usuario.id)})
      );
  }

  logOut(): void {
    this._usuario = undefined;
  }
}
