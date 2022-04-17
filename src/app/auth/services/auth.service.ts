import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
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

  login(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        tap(usuario => { this._usuario = usuario;}),
        tap(usuario => { localStorage.setItem('id', usuario.id)})
      );
  }
}
