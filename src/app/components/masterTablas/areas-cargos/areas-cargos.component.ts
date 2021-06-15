import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendServiceService } from 'src/app/services/backend-service.service';
import { Area, Cargo } from '../../../interfaces/tablasModels';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-areas-cargos',
  templateUrl: './areas-cargos.component.html',
  styleUrls: ['./areas-cargos.component.css']
})
export class AreasCargosComponent implements OnInit {

  areas: Area[] = [];
  cargos: Cargo[] = [];

  isEdit: boolean = false;
  areaId!: number;

  registroareas: FormGroup = this.fb.group({
    desarea: ['', [Validators.required, Validators.maxLength(45)]]
  })
  registrocargos: FormGroup = this.fb.group({
    idcargo: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    idarea: ['', [Validators.required]],
    descargo: ['', [Validators.required, Validators.maxLength(45)]]
  })

  constructor(
    private backendService: BackendServiceService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.actualizarAreas();
    this.actualizarCargos();
  }

  guardarArea() {
    let area;
    if(this.isEdit){
      area = {
        idarea: this.areaId,
        desarea: this.registroareas.value.desarea,
      }
    }else{
      area = {
        desarea: this.registroareas.value.desarea,
      }
    }

    this.backendService.guardarAreas(area).subscribe(
      resp => {
        this.actualizarAreas();
      },
      err => {
        console.log(err);
        console.log("Ocurrio un error guardando el item");
      }
    )
    this.registroareas.reset();
    this.isEdit = false;
  }
  guardarCargo() {
    let cargo;
   
    cargo = {
      idcargo: this.registrocargos.value.idcargo,
      idarea: this.registrocargos.value.idarea,
      descargo: this.registrocargos.value.descargo
    }

    this.backendService.guardarCargos(cargo).subscribe(
      resp => {
        this.actualizarCargos();
      },
      err => {
        console.log(err);
        console.log("Ocurrio un error guardando el item");
      }
    )
    this.registrocargos.reset();
  }

  eliminarArea(item: Area) {
    if(item.cargos.length !== 0){
      Swal.fire({
        title: 'Estas seguro?',
        text: "El área que desea eliminar tiene cargos asociados que tambien se eliminaran. Desea eliminar el área con todos los cargos?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar todo!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.backendService.eliminarAreas(item.idarea, true).subscribe(
            resp => {
            console.log(resp);
            this.actualizarAreas();
            this.actualizarCargos();
            },
            err => {
              console.log('Ocurrio un error, no se puedo eliminar el registro.');
              console.log(err);
            }
          );
        }
      })
    } else{
      this.backendService.eliminarAreas(item.idarea).subscribe(
        resp => {
        console.log(resp);
        this.actualizarAreas();
        this.actualizarCargos();
        },
        err => {
          console.log('Ocurrio un error, no se puedo eliminar el registro.');
          console.log(err);
        }
      );
    }
  }
  eliminarCargo(item: Cargo) {
    this.backendService.eliminarCargos(item.idcargo, item.idarea).subscribe(
      resp => {
      console.log(resp);
      this.actualizarCargos();
      },
      err => {
        console.log('Ocurrio un error, no se puedo eliminar el registro.');
        console.log(err);
      }
    );
  }

  actualizarAreas() {
    this.backendService.listarAreas().subscribe((response) => {
      this.areas = response;
    });
  }
  actualizarCargos() {
    this.backendService.listarCargos().subscribe((response) => {
      this.cargos = response;
    });
  }

  llenarCamposArea(item:Area){
    this.isEdit = true;
    this.areaId = item.idarea;
    this.registroareas.setValue({
      desarea: item.desarea
    })
  }
  llenarCamposCargo(item:Cargo){
    this.registrocargos.setValue({
      idcargo: item.idcargo,
      idarea: item.idarea,
      descargo: item.descargo
    })
  }

}
