import { Component, Input, OnInit } from '@angular/core';
import { Peticion } from '../../../../interfaces/tablasModels';
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
    //TODO Cuando el colaborador completa la peticion la peticion cambiara a estado completada (significa que faltaria la revision del usuario) si el usuario da conformidad la tarea pasaria a estado finalizada.
  }

}
