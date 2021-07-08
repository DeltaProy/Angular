import { Component, Input, OnInit } from '@angular/core';
import { Peticion, PeticionDet } from '../../../../interfaces/tablasModels';
import { BackendServiceService } from '../../../../services/backend-service.service';

@Component({
  selector: 'app-tareas-peticion',
  templateUrl: './tareas-peticion.component.html',
  styleUrls: ['./tareas-peticion.component.css']
})
export class TareasPeticionComponent implements OnInit {

  @Input() peticion!:Peticion;

  asignadoNombre!:String;

  constructor(
    private backendService: BackendServiceService
  ) { }

  ngOnInit(): void {
    this.backendService.buscarPersonal(this.peticion.idasignado!).subscribe(
      resp => {
        this.asignadoNombre = `${resp.nomper} ${resp.apeper}`;
      },
      err => {console.log(err)}
    )
  }

  completarPeticion(){
    this.peticion.estado = 'COMPLETADA';
    this.backendService.actualizarPeticion(this.peticion).subscribe(
      respPeticion => {
        const peticionDetalle: PeticionDet = {
          idpeticion: respPeticion.idpeticion,
          fecha_mov: new Date(),
          id_usuario: respPeticion.idusuario,
          estado_ant: respPeticion.detalles[respPeticion.detalles.length - 1].estado_act,
          estado_act: respPeticion.estado,
          observacion: `Tarea completada por ${this.asignadoNombre} con id: ${this.peticion.idasignado}`
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
