import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from "rxjs/operators";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(private _http: HttpClient, public router: Router) {
    this.cargarStorage();
  }

  estaLogueado(){
    return (this.token.length > 5) ? true : false; 
  }

  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = null;
    }
  }

  guadarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logout(){
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {

    let url = URL_SERVICIOS + '/login/google';

    return this._http.post(url, { token })
    .pipe(
      map((resp: any) => {
        this.guadarStorage(resp.usuario._id, resp.token, resp.usuario);
        return resp;
      })
    );

  }

  login(usuario: Usuario, recuerdame: boolean = false) {

    if (recuerdame) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this._http.post(url, usuario)
      .pipe(
        map((resp: any) => {
          this.guadarStorage(resp.usuario._id, resp.token, resp.usuario);
          // localStorage.setItem('id', resp.usuario._id);
          // localStorage.setItem('token', resp.token);
          // localStorage.setItem('usuario', JSON.stringify(resp.usuario));
          return resp;
        })
      );

  }

  crearUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario';

    return this._http.post(url, usuario)
      .pipe(
        map((resp: any) => {
          Swal.fire({
            icon: 'success',
            title: `Usuario ${usuario.email} creado`,
            text: 'Sera redirigido al login para iniciar sesión',
          })
          return resp.usaurio;
        })
      );

  }

}
