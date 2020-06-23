import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { MedicoService } from 'src/app/services/medico/medico.service';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('','','',null,'');
  hospital: Hospital = new Hospital('','','');

  constructor(public _hospitalService: HospitalService, public _medicoService: MedicoService, public router: Router, public activatedRoute: ActivatedRoute, public _modalUploadService: ModalUploadService) {

    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if (id !== 'nuevo'){
        this.cargarMedico(id);
      }

    });

    this._modalUploadService.notificacion.subscribe(response =>{
      console.log(response);
      this.medico.img = response.medico.img;
    });


  }

  ngOnInit(): void {
    this._hospitalService.cargarHospitales().subscribe((response:any) => {
      this.hospitales = response.hospitales;
    },error => {
      console.log(error);
    });
  }

  cargarMedico(id: string){

    this._medicoService.cargarMedico(id).subscribe(response => {
      console.log(response);
      this.medico = response;
      this.medico.hospital = response.hospital._id;
      this.cambioHospital(response.hospital);
    }, error => {
      console.log(error);
    });

  }

  guardarMedico(f: NgForm){
    if(!f.valid) return;

    this._medicoService.guardarMedico(this.medico).subscribe(response => {
      console.log(response);
      this.medico._id = response.body._id;
      this.router.navigate(['/medico', response.body._id]);
    },error => {
      console.log(error);
    });
  }

  cambioHospital(id: string){
    this._hospitalService.obtenerHospital(id).subscribe((response:any) => {
      this.hospital = response.hospital;
    },error => {
      console.log(error);
    });
  }

  cambiarImagen(){
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }

}
