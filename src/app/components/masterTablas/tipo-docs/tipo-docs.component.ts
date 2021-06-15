import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoDoc } from 'src/app/interfaces/tablasModels';
import { BackendServiceService } from '../../../services/backend-service.service';

@Component({
  selector: 'app-tipo-docs',
  templateUrl: './tipo-docs.component.html',
  styleUrls: ['./tipo-docs.component.css'],
})
export class TipoDocsComponent implements OnInit {

  tiposDocs: TipoDoc[] = [];

  isEdit: boolean = false;
  itemId!: number;

  registro: FormGroup = this.fb.group({
    descorta: ['', [Validators.required, Validators.maxLength(3)]],
    deslarga: ['', [Validators.required, Validators.maxLength(45)]]
  })

  constructor(
    private backendService: BackendServiceService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.actualizarTiposDocs();
  }

  guardar() {
    let tipodoc;
    if(this.isEdit){
      tipodoc = {
        idtipodoc: this.itemId,
        descortipodoc: this.registro.value.descorta,
        deslartipodoc: this.registro.value.deslarga
      }
    }else{
      tipodoc = {
        descortipodoc: this.registro.value.descorta,
        deslartipodoc: this.registro.value.deslarga
      }
    }

    this.backendService.guardarTiposDocs(tipodoc).subscribe(
      resp => {
        this.actualizarTiposDocs();
      },
      err => {
        console.log(err);
        console.log("Ocurrio un error guardando el item");
      }
    )
    this.registro.reset();
    this.isEdit = false;
  }

  eliminar(item: TipoDoc) {
    this.backendService.eliminarTiposDocs(item.idtipodoc).subscribe(
      resp => {
      console.log(resp);
      this.actualizarTiposDocs();
      },
      err => {
        console.log('Ocurrio un error, no se puedo eliminar el registro.');
        console.log(err);
      }
    );
  }

  actualizarTiposDocs() {
    this.backendService.listarTiposDocs().subscribe((response) => {
      this.tiposDocs = response;
    });
  }

  llenarCampos(item:TipoDoc){
    this.isEdit = true;
    this.itemId = item.idtipodoc;
    this.registro.setValue({
      descorta: item.descortipodoc,
      deslarga: item.deslartipodoc
    })
  }
}
