import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empresa } from 'src/app/interfaces/tablasModels';
import { BackendServiceService } from 'src/app/services/backend-service.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  empresas: Empresa[] = [];
  isEdit: boolean = false;
  itemId!: number;

  registro: FormGroup = this.fb.group({
    razonsocial: ['', [Validators.required, Validators.maxLength(100)]],
    nroruc: ['', [Validators.required, Validators.maxLength(11), Validators.pattern('[0-9]*')]]
  })

  constructor(
    private backendService: BackendServiceService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.actualizarEmpresas();
  }

  guardar() {
    let empresa;
    if(this.isEdit){
      empresa = {
        idempresa: this.itemId,
        razonsocial: this.registro.value.razonsocial,
        nroruc: this.registro.value.nroruc
      }
    }else{
      empresa = {
        razonsocial: this.registro.value.razonsocial,
        nroruc: this.registro.value.nroruc
      }
    }

    this.backendService.guardarEmpresas(empresa).subscribe(
      resp => {
        this.actualizarEmpresas();
      },
      err => {
        console.log(err);
        console.log("Ocurrio un error guardando el item");
      }
    )
    this.registro.reset();
    this.isEdit = false;
  }

  eliminar(item: Empresa) {
    this.backendService.eliminarEmpresas(item.idempresa).subscribe(
      resp => {
      console.log(resp);
      this.actualizarEmpresas();
      },
      err => {
        console.log('Ocurrio un error, no se puedo eliminar el registro.');
        console.log(err);
      }
    );
  }

  actualizarEmpresas() {
    this.backendService.listarEmpresas().subscribe((response) => {
      this.empresas = response;
    });
  }

  llenarCampos(item:Empresa){
    this.isEdit = true;
    this.itemId = item.idempresa;
    this.registro.setValue({
      razonsocial: item.razonsocial,
      nroruc: item.nroruc
    })
  }

}
