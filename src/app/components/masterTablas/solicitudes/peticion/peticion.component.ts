import { Component, Input, OnInit } from '@angular/core';
import { BackendServiceService } from '../../../../services/backend-service.service';
import { Peticion, Area } from '../../../../interfaces/tablasModels';

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

}
