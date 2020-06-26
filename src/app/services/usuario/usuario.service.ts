import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, catchError } from "rxjs/operators";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor(private _http: HttpClient, public router: Router, public subirArchivoService: SubirArchivoService) {
    this.cargarStorage();
  }

  renuevaToken(){

    let url = URL_SERVICIOS + '/login/renuevaToken';
    url += '?token=' + this.token;

    return this._http.get(url)
      .pipe(
        map((resp:any) => {

          this.token = resp.token;
          localStorage.setItem('token', this.token);
          console.log('token renovado');
          return true;

        }),
        catchError(err => {
          this.router.navigateByUrl('/login');
          Swal.fire('Error', 'No se ha logrado renovar el token, se cerrara la sesión', 'error');
          return Observable.throw(err);
        })
      );

  }

  estaLogueado(){
    return (this.token.length > 5) ? true : false; 
  }

  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    }else{
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guadarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout(){
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {

    let url = URL_SERVICIOS + '/login/google';

    return this._http.post(url, { token })
    .pipe(
      map((resp: any) => {
        this.guadarStorage(resp.usuario._id, resp.token, resp.usuario, resp.menu);
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
          this.guadarStorage(resp.usuario._id, resp.token, resp.usuario, resp.menu);
          return resp;
        }),
        catchError(err => {
          console.log(err.error.mensaje);
          Swal.fire('Error', err.error.mensaje, 'error');
          return Observable.throw(err);
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
          });
          return resp.usaurio;
        })
      );

  }

  actualizarUsuario(usuario: Usuario){

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this._http.put(url, usuario)
          .pipe(
            map((resp: any) => {

              let user: Usuario = resp.body;
              
              this.guadarStorage(user._id, this.token, user, this.menu);

              Swal.fire({
                icon: 'success',
                title: `Usuario ${user.nombre} actualizado`,
                text: 'Usuario actualizado correctamente',
              })
              return resp;
            })
          );

  }

  cambiarImagen(file: File, id: string){
  
    this.subirArchivoService.subirArchivo(file, 'usuarios', id)
        .then( (resp: any) => {
          this.usuario.img = resp.usuario.img;
          Swal.fire({
            icon: 'success',
            title: `Imagen actualizada`,
            text: 'Sera ha actualizado la imagen correctamente'
          });
          this.guadarStorage(id, this.token, this.usuario, this.menu);
        })
        .catch( (resp: any) => {
          console.log(resp);
        });

  }

  cargarUsuarios(desde: number = 0){

    let url = `${URL_SERVICIOS}/usuario?desde=${desde}`;

    return this._http.get(url);

  }

  buscarUsuarios(termino: string){

    let url = `${URL_SERVICIOS}/busqueda/coleccion/usuarios/${termino}`;

    return this._http.get(url)
      .pipe(
        map((resp: any) => {
          return resp.usuarios;
        })
      );

  }

  borrarUsuario(id:string){
    let url = `${URL_SERVICIOS}/usuario/${id}`;
    url += '?token=' + this.token;

    return this._http.delete(url)
      .pipe(
        map(resp => {
          Swal.fire('Usuario Eliminado','Se ha eliminado correctamente','success');
          return resp;
        })
      );
  }

}
