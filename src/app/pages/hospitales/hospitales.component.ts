import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { stringify } from 'querystring';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];

  constructor(public _hospitalService: HospitalService, public _modalUpload: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this._modalUpload.notificacion.subscribe(response => {
      console.log(response);
      this.cargarHospitales();
    });
  }

  cargarHospitales(){
    this._hospitalService.cargarHospitales().subscribe((response: any) => {
      this.hospitales = response.hospitales;
    },error => {
      console.log(error);
    });
  }

  buscarHospital(termino: string){
    this._hospitalService.buscarHospital(termino).subscribe(response => {
      this.hospitales = response;
    }, error=> {
      console.log(error);
    });
  }

  async crearHospital(){
    const { value: text } = await Swal.fire({
      title: 'Nuevo Hospital',
      input: 'text',
      inputPlaceholder: 'Ingrese el nombre del hospital'
    })
    
    if (!text) {
      Swal.fire(`Debe de ingresar un nombre`)
      return;
    }

    let valor: any = text;

    this._hospitalService.crearHospital(valor).subscribe(response => {
      this.cargarHospitales();
    }, error =>{
      console.log(error);
    });

  }

  cambiarImagen(id: string){
    this._modalUpload.mostrarModal('hospitales', id);
  }

  actualizarHospital(hospital: Hospital){
    this._hospitalService.actualizarHospital(hospital).subscribe(response => {
      console.log(response);
      this.cargarHospitales();
    },error => {
      console.log(error);
    });
  }

  borrarHospital(hospital: Hospital){
    Swal.fire({
      title: 'Confirmar',
      text: `¿Realmente desea eliminar el hospital ${hospital.nombre}?`,
      icon: 'warning',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        this._hospitalService.borrarHospital(hospital._id).subscribe(response => {
          this.cargarHospitales();
        });
      }
    })
  }

}
