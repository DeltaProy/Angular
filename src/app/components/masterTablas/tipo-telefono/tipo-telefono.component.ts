import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendServiceService } from 'src/app/services/backend-service.service';
import { TipoTelf } from '../../../interfaces/tablasModels';

@Component({
  selector: 'app-tipo-telefono',
  templateUrl: './tipo-telefono.component.html',
  styleUrls: ['./tipo-telefono.component.css']
})
export class TipoTelefonoComponent implements OnInit {

  tiposTelf: TipoTelf[] = [];
  isEdit: boolean = false;
  itemId!: number;

  registro: FormGroup = this.fb.group({
    destipotelf: ['', [Validators.required, Validators.maxLength(20)]]
  })

  constructor(
    private backendService: BackendServiceService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.actualizarTiposTelf();
  }

  guardar() {
    let tipotelf;
    if(this.isEdit){
      tipotelf = {
        idtipotelf: this.itemId,
        destipotelf: this.registro.value.destipotelf,
      }
    }else{
      tipotelf = {
        destipotelf: this.registro.value.destipotelf,
      }
    }

    this.backendService.guardarTiposTelefono(tipotelf).subscribe(
      resp => {
        this.actualizarTiposTelf();
      },
      err => {
        console.log(err);
        console.log("Ocurrio un error guardando el item");
      }
    )
    this.registro.reset();
    this.isEdit = false;
  }

  eliminar(item: TipoTelf) {
    this.backendService.eliminarTiposTelefono(item.idtipotelf).subscribe(
      resp => {
      console.log(resp);
      this.actualizarTiposTelf();
      },
      err => {
        console.log('Ocurrio un error, no se puedo eliminar el registro.');
        console.log(err);
      }
    );
  }

  actualizarTiposTelf() {
    this.backendService.listarTiposTelefono().subscribe((response) => {
      this.tiposTelf = response;
    });
  }

  llenarCampos(item:TipoTelf){
    this.isEdit = true;
    this.itemId = item.idtipotelf;
    this.registro.setValue({
      destipotelf: item.destipotelf
    })
  }

}
