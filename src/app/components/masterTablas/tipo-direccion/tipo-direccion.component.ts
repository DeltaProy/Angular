import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendServiceService } from 'src/app/services/backend-service.service';
import { TipoDirec } from '../../../interfaces/tablasModels';

@Component({
  selector: 'app-tipo-direccion',
  templateUrl: './tipo-direccion.component.html',
  styleUrls: ['./tipo-direccion.component.css']
})
export class TipoDireccionComponent implements OnInit {

  tiposDirec: TipoDirec[] = [];
  isEdit: boolean = false;
  itemId!: number;

  registro: FormGroup = this.fb.group({
    destipodir: ['', [Validators.required, Validators.maxLength(45)]]
  })

  constructor(
    private backendService: BackendServiceService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.actualizarTiposDirec();
  }

  guardar() {
    let tipodir;
    if(this.isEdit){
      tipodir = {
        idtipodir: this.itemId,
        destipodir: this.registro.value.destipodir
      }
    }else{
      tipodir = {
        destipodir: this.registro.value.destipodir
      }
    }

    this.backendService.guardarTiposDireccion(tipodir).subscribe(
      resp => {
        this.actualizarTiposDirec();
      },
      err => {
        console.log(err);
        console.log("Ocurrio un error guardando el item");
      }
    )
    this.registro.reset();
    this.isEdit = false;
  }

  eliminar(item: TipoDirec) {
    this.backendService.eliminarTiposDireccion(item.idtipodir).subscribe(
      resp => {
      console.log(resp);
      this.actualizarTiposDirec();
      },
      err => {
        console.log('Ocurrio un error, no se puedo eliminar el registro.');
        console.log(err);
      }
    );
  }

  actualizarTiposDirec() {
    this.backendService.listarTiposDireccion().subscribe((response) => {
      this.tiposDirec = response;
    });
  }

  llenarCampos(item:TipoDirec){
    this.isEdit = true;
    this.itemId = item.idtipodir;
    this.registro.setValue({
      destipodir: item.destipodir
    })
  }

}
