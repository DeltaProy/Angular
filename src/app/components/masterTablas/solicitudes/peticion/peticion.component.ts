import { Component, Input, OnInit } from '@angular/core';
import { BackendServiceService } from '../../../../services/backend-service.service';
import { Peticion, Area, PeticionDet } from '../../../../interfaces/tablasModels';

@Component({
  selector: 'app-peticion',
  templateUrl: './peticion.component.html',
  styleUrls: ['./peticion.component.css']
})
export class PeticionComponent implements OnInit {

  @Input() peticion!:Peticion;

  area!:Area;


  constructor(
    private backendService: BackendServiceService,
  ) { }

  ngOnInit(): void {
    this.backendService.listarArea(this.peticion.idarea).subscribe(
      resp => {
        this.area = resp;
      },
      err => {console.log(err)}
    )
  }

  finalizarPeticion(){
    this.peticion.estado = 'FINALIZADA';
    this.backendService.actualizarPeticion(this.peticion).subscribe(
      respPeticion => {
        const peticionDetalle: PeticionDet = {
          idpeticion: respPeticion.idpeticion,
          fecha_mov: new Date(),
          id_usuario: respPeticion.idusuario,
          estado_ant: respPeticion.detalles[respPeticion.detalles.length - 1].estado_act,
          estado_act: respPeticion.estado,
          observacion: `Tarea finalizada`
        }
        this.backendService.guardarPeticionDet(peticionDetalle).subscribe(
          detalle => {
            window.location.reload();
          },
          err => {console.log(err)}
        )
      }
    )
  }

  cancelarPeticion(){
    this.peticion.estado = 'CANCELADA';
    this.backendService.actualizarPeticion(this.peticion).subscribe(
      respPeticion => {
        const peticionDetalle: PeticionDet = {
          idpeticion: respPeticion.idpeticion,
          fecha_mov: new Date(),
          id_usuario: respPeticion.idusuario,
          estado_ant: respPeticion.detalles[respPeticion.detalles.length - 1].estado_act,
          estado_act: respPeticion.estado,
          observacion: `Tarea cancelada`
        }
        this.backendService.guardarPeticionDet(peticionDetalle).subscribe(
          detalle => {
            window.location.reload();
          },
          err => {console.log(err)}
        )
      }
    )
  }
}
