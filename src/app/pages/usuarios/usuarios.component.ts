import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistro: number = 0;
  cargando: boolean = false;

  constructor(public _usuarioService: UsuarioService, public _modalUpload: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarUsers();
    this._modalUpload.notificacion.subscribe(response => {
      console.log(response);
      this.cargarUsers();
    });
  }

  cargarUsers(){
    this._usuarioService.cargarUsuarios(this.desde).subscribe((response:any) => {
      this.totalRegistro = response.total;
      this.usuarios = response.usuarios;
    },error=>{
      console.log(error);
    });
  }

  cambiarDesde(valor: number){

    let desde = this.desde + valor;
    console.log(desde);

    if(desde >= this.totalRegistro) return;

    if(desde < 0) return;

    this.desde += valor;
    this.cargarUsers();

  }

  buscarUsuario(termino: string){

    if(termino.length <= 0){
      this.cargarUsers();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios(termino).subscribe(response =>{
      this.usuarios = response;
      this.cargando = false;
    }, error=>{
      console.log(error);
      this.cargando = false;
    });
  }

  borrarUsuario(usuario: Usuario){


    if(usuario._id === this._usuarioService.usuario._id){
      Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
      return;
    }

    Swal.fire({
      title: 'Confirmar',
      text: `¿Realmente desea eliminar al usuario ${usuario.nombre}?`,
      icon: 'warning',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        this._usuarioService.borrarUsuario(usuario._id).subscribe(response => {
          this.cargarUsers();
        });
      }
    })

  }

  actualizarUsuario(usuario: Usuario){
    this._usuarioService.actualizarUsuario(usuario).subscribe(response => {
      console.log(response);
    },error=> {
      console.log(error);
    });
  }

  cambiarImagen(id: string){
    this._modalUpload.mostrarModal('usuarios', id);
  }

}
