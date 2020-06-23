import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { Hospital } from 'src/app/models/hospital.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  token: string;

  constructor(public _usuarioService: UsuarioService, private _http: HttpClient) {
    this.token = _usuarioService.token;
  }

  cargarHospitales(){

    let url = URL_SERVICIOS + '/hospital';

    return this._http.get(url);

  }

  obtenerHospital(id: string){

    let url = URL_SERVICIOS + '/hospital/' + id;

    return this._http.get(url);

  }

  borrarHospital(id: string){

    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this.token;

    return this._http.delete(url);

  }

  crearHospital(nombre: string){

    let url = URL_SERVICIOS + '/hospital/';
    url += '?token=' + this.token;

    return this._http.post(url, {nombre:nombre});

  }

  buscarHospital(termino: string){

    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this._http.get(url)
      .pipe(
        map((resp: any) => {
          let hospitales;
          hospitales = resp.hospitales;
          return hospitales;
        })
      )

  }

  actualizarHospital(hospital: Hospital){

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this.token;

    return this._http.put(url, hospital);

  }

}
