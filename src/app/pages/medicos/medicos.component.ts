import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/services/medico/medico.service';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  constructor(public _medicoService: MedicoService) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicoService.cargarMedicos().subscribe(response => {
      this.medicos = response;
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  buscarMedico(termino: string) {
    this._medicoService.buscarMedicos(termino).subscribe(response => {
      console.log(response);
      this.medicos = response;
    }, error => {
      console.log(error);
    });
  }

  editarMedico(medico: Medico) {
    console.log(medico);
  }

  borrarMedico(medico: Medico) {
    this._medicoService.borrarMedico(medico._id).subscribe(resp => {
      this.cargarMedicos();
    },error => {
      console.log(error);
    });
  }

}
