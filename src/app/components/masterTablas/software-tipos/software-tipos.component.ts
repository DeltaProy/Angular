import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendServiceService } from 'src/app/services/backend-service.service';
import { TipoSoft, Soft } from '../../../interfaces/tablasModels';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-software-tipos',
  templateUrl: './software-tipos.component.html',
  styleUrls: ['./software-tipos.component.css']
})
export class SoftwareTiposComponent implements OnInit {

  tipossoft: TipoSoft[] = [];
  softs: Soft[] = [];

  isEdit: boolean = false;
  tipoSoftId!: number;
  softId!: number;

  registrotiposoft: FormGroup = this.fb.group({
    destiposoft: ['', [Validators.required, Validators.maxLength(45)]]
  })
  registrosoft: FormGroup = this.fb.group({
    dessoft: ['', [Validators.required, Validators.maxLength(45)]],
    idtiposoft: ['', [Validators.required]]
  })

  constructor(
    private backendService: BackendServiceService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.actualizarTipoSoft();
    this.actualizarSoft();
  }

  guardarTipoSoft() {
    let tiposoft;
    if(this.isEdit){
      tiposoft = {
        idtiposoft: this.tipoSoftId,
        destiposoft: this.registrotiposoft.value.destiposoft,
      }
    }else{
      tiposoft = {
        destiposoft: this.registrotiposoft.value.destiposoft,
      }
    }

    this.backendService.guardarTipoSoft(tiposoft).subscribe(
      resp => {
        this.actualizarTipoSoft();
      },
      err => {
        console.log(err);
        console.log("Ocurrio un error guardando el item");
      }
    )
    this.registrotiposoft.reset();
    this.isEdit = false;
  }
  guardarSoft() {
    let soft;
    if(this.isEdit){
      soft = {
        idsoft: this.softId,
        idtiposoft: this.registrosoft.value.idtiposoft,
        dessoft: this.registrosoft.value.dessoft,
      }
    }else{
      soft = {
        idtiposoft: this.registrosoft.value.idtiposoft,
        dessoft: this.registrosoft.value.dessoft,
      }
    }

    this.backendService.guardarSoftware(soft).subscribe(
      resp => {
        this.actualizarSoft();
      },
      err => {
        console.log(err);
        console.log("Ocurrio un error guardando el item");
      }
    )
    this.registrosoft.reset();
    this.isEdit = false;
  }

  eliminarTipoSoft(item: TipoSoft) {
    this.backendService.eliminarTipoSoft(item.idtiposoft).subscribe(
      resp => {
      console.log(resp);
      this.actualizarTipoSoft();
      this.actualizarSoft();
      },
      err => {
        console.log('Ocurrio un error, no se puedo eliminar el registro.');
        console.log(err);
        Swal.fire({
          title: 'Error al eliminar tipo de software',
          text: 'El tipo de software tiene asociados varios softwares. Porfavor, eliminelos o editelos.',
          icon: 'warning'
        })
      }
    );
  }
  eliminarSoft(item: Soft) {
    this.backendService.eliminarSoftware(item.idsoft).subscribe(
      resp => {
      console.log(resp);
      this.actualizarSoft();
      },
      err => {
        console.log('Ocurrio un error, no se puedo eliminar el registro.');
        console.log(err);
      }
    );
  }

  actualizarTipoSoft() {
    this.backendService.listarTipoSoft().subscribe((response) => {
      this.tipossoft = response;
    });
  }
  actualizarSoft() {
    this.backendService.listarSoftware().subscribe((response) => {
      this.softs = response;
    });
  }

  llenarCamposTipoSoft(item:TipoSoft){
    this.isEdit = true;
    this.tipoSoftId = item.idtiposoft;
    this.registrotiposoft.setValue({
      destiposoft: item.destiposoft
    })
  }
  llenarCamposSoft(item:Soft){
    this.isEdit = true;
    this.softId = item.idsoft;
    this.registrosoft.setValue({
      idtiposoft: item.idtiposoft,
      dessoft: item.dessoft
    })
  }

}
