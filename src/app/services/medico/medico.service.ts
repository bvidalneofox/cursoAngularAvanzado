import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedico: number = 0;

  constructor(public _hhtp: HttpClient, public _usuarioService: UsuarioService) { }

  cargarMedicos() {

    let url = URL_SERVICIOS + '/medico';

    return this._hhtp.get(url)
      .pipe(
        map((resp: any) => {
          this.totalMedico = resp.total;
          return resp.medicos;
        })
      );

  }

  buscarMedicos(termino: string) {

    let url = `${URL_SERVICIOS}/busqueda/coleccion/medicos/${termino}`;

    return this._hhtp.get(url)
      .pipe(
        map((resp: any) => {
          return resp.medicos;
        })
      );

  }

  borrarMedico(id: string) {

    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;

    return this._hhtp.delete(url)
      .pipe(
        map(resp => {
          Swal.fire('Eliminado', 'Medico eliminado correctamente', 'success');
        })
      );

  }

  guardarMedico(medico: Medico) {

    if (medico._id) {

      let url = URL_SERVICIOS + '/medico/' + medico._id;

      url += '?token=' + this._usuarioService.token;

      return this._hhtp.put(url, medico)
        .pipe(
          map((resp: any) => {
            Swal.fire('Correcto', `Medico ${medico.nombre} actualizado correctamente`, 'success');
            return resp;
          })
        );

    } else {

      let url = URL_SERVICIOS + '/medico';

      url += '?token=' + this._usuarioService.token;

      return this._hhtp.post(url, medico)
        .pipe(
          map((resp: any) => {
            Swal.fire('Correcto', `Medico ${medico.nombre} creado correctamente`, 'success');
            return resp;
          })
        );
    }
  }

  cargarMedico(id: string) {

    let url = URL_SERVICIOS + '/medico/' + id;

    return this._hhtp.get(url)
      .pipe(
        map((resp: any) => {
          return resp.medico;
        })
      );

  }

}
