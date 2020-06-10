import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor(public router: Router, public _usuarioService: UsuarioService) { }

  ngOnInit(): void {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if(this.email.length > 1){
      this.recuerdame = true;
    }
  }

  googleInit(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '1077143188123-rbb16ef4u5m1djrbkauhnlak6ehuaobk.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));

    });
  }

  attachSignin(element){
    this.auth2.attachClickHandler(element, {}, (googleUser) => {

      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle(token).subscribe(response => {
        // this.router.navigate(['/dashboard']);
        window.location.href = '#/dashboard';
      },error=>{
        console.log(error);
      });

      console.log(token);

    });
  }

  ingresar(form: NgForm){

    if(form.invalid) return;

    let usuario: Usuario = new Usuario(null, form.value.email, form.value.password)

    this._usuarioService.login(usuario, this.recuerdame).subscribe(response => {
      this.router.navigate(['/dashboard']);
    }, error => {
      console.log(error);
    });
    // this.router.navigate(['/dashboard']);
  }

}
