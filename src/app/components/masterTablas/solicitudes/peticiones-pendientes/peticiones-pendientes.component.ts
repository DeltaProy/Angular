import { Component, Input, OnInit } from '@angular/core';
import { Peticion, Personal, PeticionDet } from '../../../../interfaces/tablasModels';
import { BackendServiceService } from '../../../../services/backend-service.service';

@Component({
  selector: 'app-peticiones-pendientes',
  templateUrl: './peticiones-pendientes.component.html',
  styleUrls: ['./peticiones-pendientes.component.css']
})
export class PeticionesPendientesComponent implements OnInit {

  @Input() peticion!:Peticion;

  asignado!:Personal;
  asignadoNombre:string = '...';

  areaPersonal:Personal[] = [];

  constructor(
    private backendService: BackendServiceService
  ) { }

  ngOnInit(): void {
    if(this.peticion.idasignado){
      this.backendService.buscarPersonal(this.peticion.idasignado).subscribe(
        resp => {
          this.asignado = resp;
          this.asignadoNombre = `${this.asignado.nomper} ${this.asignado.apeper}`;
        },
        err => {console.log(err)}
      )
    } else{
      this.asignadoNombre = 'pendiente';
    }

    this.backendService.listaPersonalPorArea(this.peticion.idarea).subscribe(
      resp => {
        this.areaPersonal = resp;
      },
      err => {console.log(err)}
    );
  }


  asignarPersona(persona:Personal){
    this.peticion.idasignado = persona.idpersonal;
    this.peticion.estado = 'ASIGNADO';
    this.backendService.actualizarPeticion(this.peticion).subscribe(
      respPeticion => {
        const peticionDetalle: PeticionDet = {
          idpeticion: respPeticion.idpeticion,
          fecha_mov: new Date(),
          id_usuario: respPeticion.idusuario,
          estado_ant: respPeticion.detalles[respPeticion.detalles.length - 1].estado_act,
          estado_act: respPeticion.estado,
          observacion: `Asignado a ${persona.nomper} ${persona.apeper} con id: ${persona.idpersonal}`
        }
        this.backendService.guardarPeticionDet(peticionDetalle).subscribe(
          detalle => {
            
            this.peticion = respPeticion;
            this.ngOnInit();
            
          },
          err => {console.log(err)}
        )
      }
    )
  }

}
