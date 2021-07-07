import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from '../../../services/backend-service.service';
import { Peticion, Area, PeticionDet, Personal } from '../../../interfaces/tablasModels';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

  peticiones: Peticion[] = [];
  areas: Area[] = [];
  peticionesPendientes: Peticion[] = [];
  tareasPeticion: Peticion[] = [];

  peticionForm: FormGroup = this.fb.group({
    titulo: [, [Validators.required]],
    idarea: ['', [Validators.required]],
    descripcion: [, [Validators.required]]
  });

  constructor(
    private backendService: BackendServiceService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getPeticiones();
    this.getAreas();
    this.getPeticionesPendientes();
    this.getTareasPeticion();
  }
  

  registrarPeticion(){
    if(this.backendService.userId == null) return 'Error, no se encontro el usuario';
    
    const peticion: Peticion = {
      titulo: this.peticionForm.value.titulo,
      despeticion: this.peticionForm.value.descripcion,
      idarea: this.peticionForm.value.idarea,
      idusuario: this.backendService.userId,
      estado: 'PENDIENTE DE REVISION',
      detalles: []
    };

    this.backendService.guardarPeticion(peticion).subscribe(
      resp => {
        const peticionDetalle: PeticionDet = {
          idpeticion: resp.idpeticion,
          fecha_mov: new Date(),
          id_usuario: resp.idusuario,
          estado_ant: null,
          estado_act: resp.estado,
          observacion: 'Peticion creada'
        }
        this.backendService.guardarPeticionDet(peticionDetalle).subscribe(
          resp => {
            this.peticionForm.reset();
            this.ngOnInit();
          },
          err => {
            console.log(err)
          }
        )
      },
      err => {
        console.log(err)
      }
    ); 
    return;
  }

  hayPeticionesPendientes(){
    if(this.peticionesPendientes.length == 0) return false;
    else return true;
  }
  hayTareasPeticion(){
    if(this.tareasPeticion.length == 0) return false;
    else return true;
  }

  getPeticiones(){
    this.backendService.listarPeticionesUsuario().subscribe(
      resp => {
        if(typeof(resp) !== 'string'){
          this.peticiones = resp;
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  getAreas(){
    this.backendService.listarAreas().subscribe(
      resp => {
        this.areas = resp;
      },
      err => {
        console.log(err);
      }
    )
  }
  getPeticionesPendientes(){
    this.backendService.listarPeticionesPendientes().subscribe(
      resp => {
        this.peticionesPendientes = resp;
      },
      err => {
        console.log(err);
      }
    )
  }
  getTareasPeticion(){
    this.backendService.listarTareasPeticion().subscribe(
      resp => {
        this.tareasPeticion = resp;
      }, 
      err => {
        console.log(err);
      }
    )
  }
  async getNombreAsignado(idAsignado: number | undefined){
    if(idAsignado){
      return idAsignado;
      /* return this.backendService.buscarPersonal(idAsignado).subscribe(
        resp => {
          return `${resp.nomper} ${resp.apeper}`;
        },err => {console.log(err)}
      ); */
    }else{
      return 'pendiente';
    }
    
  }
}
