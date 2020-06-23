import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(public activatedRoute: ActivatedRoute, public _http: HttpClient) {
    this.activatedRoute.params.subscribe( params => {
      let termino = params['termino'];
      this.buscar(termino);
    });
  }

  ngOnInit(): void {
  }

  buscar(termino: string){
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this._http.get(url).subscribe((response: any) => {
      this.usuarios = response.usuarios;
      this.medicos = response.medicos;
      this.hospitales = response.hospitales;

      console.log(this.usuarios);
      console.log(this.medicos);
      console.log(this.hospitales);
    });
  }

}
