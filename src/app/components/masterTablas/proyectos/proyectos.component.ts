import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendServiceService } from 'src/app/services/backend-service.service';
import Swal from 'sweetalert2';
import { ProyectoRecurso, ProyectoHomologado } from '../../../interfaces/tablasModels';



@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  allProyectos: any[] = [];
  proyectosActivos: any[] = [];
  proyectos: any[] = [];
  empresas: any[] = [];
  personal: any[] = [];
  proyectoHomologados: ProyectoHomologado[] = [];
  proyectoRecursos: ProyectoRecurso[] = [];

  nuevoProyectoForm!: FormGroup;
  archivoSeleccionado: File = null!;
  userID!: number;

  isLoading: boolean = false;
  isCloseModal: boolean = false;
  modalContent: number = 0; //0 : LOADING, 1 : HOMOLOGADOS, 2 : SUBIDA EXITOSA, 3 : NOMBRE EXISTENTE, 4 : ACTUALIZAR
  subiendoTexto: string = '';
  proyectoActivo: string = '';

  fd!: FormData;

  constructor(
    private backendService: BackendServiceService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userID = this.backendService.userId!;
    this.nuevoProyectoForm = this.fb.group({
      archivoProyecto: [null, Validators.required],
      cliente: [null, Validators.required],
      nombreProyecto: ['', Validators.required]
    })
    
    this.getProyectos();
    this.getEmpresas();
    this.getPersonal();
  }

  changeValorEnProyectoHomologado(event:any, ph:any){
    ph.idpersonal = parseInt(event.target.value);
  } 
  
  
  phIsValid(){
    let isValid = true;
    this.proyectoHomologados.forEach(ph => {
      if(ph.idpersonal === null){
        isValid = false;
      }
    })
    return isValid;
  }
  
  getEmpresas(){
    this.backendService.listarEmpresas().subscribe(
      resp => {
        this.empresas = resp;
      }
    )
  }

  getProyectos(){
    this.backendService.listarProyectosPorResponsable(this.userID).subscribe(
      resp => {
        this.allProyectos = resp;
        this.proyectos = this.allProyectos;
        this.proyectosActivos = this.allProyectos.filter(proyecto => proyecto.fecfinreal === null);
      }
      )
  }
  
  getPersonal(){
    this.backendService.listarPersonal().subscribe(
      resp => {
        this.personal = resp;
      }
    )
  }

  getNombreEmpresa(id:number){
    if(this.empresas.length === 0) return;
    
    return this.empresas.find(({idempresa}) => idempresa === id).razonsocial;
  }

  getNombrePersonal(id:number){
    if(this.personal.length === 0) return 'N/A';
    const personal = this.personal.find(({idpersonal}) => idpersonal === id);
    return `${personal.nomper} ${personal.apeper}`;
  }

  getFechaHoy(){
    return new Date();
  }

  changeFecha(e:any, pr:ProyectoRecurso, tipo:string){

    const fecha = e.target.value;

    if(/^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4})$/.test(fecha)){

      const fecharArr = fecha.split('/');

      if(tipo === 'ini'){
        pr.fecini_lab = new Date(parseInt(fecharArr[2]), parseInt(fecharArr[1])-1, parseInt(fecharArr[0]));
        this.backendService.actualizarProyectoRecurso(pr).subscribe(
          resp => {this.mostrarRecursos(pr.idproyecto)},
          err => {
            console.log(err);
            console.log('No se pudo actualizar la fecha, poner una fecha valida o hablar con el administrador');
            this.mostrarRecursos(pr.idproyecto);
          }
        );
        e.target.value = '';

      }else if(tipo === 'fin'){
        pr.fecfin_lab = new Date(parseInt(fecharArr[2]), parseInt(fecharArr[1])-1, parseInt(fecharArr[0]));
        this.backendService.actualizarProyectoRecurso(pr).subscribe(
          resp => {this.mostrarRecursos(pr.idproyecto)},
          err => {
            console.log(err);
            console.log('No se pudo actualizar la fecha, poner una fecha valida o hablar con el administrador');
            this.mostrarRecursos(pr.idproyecto);
          }
        );
        e.target.value = '';

      }else return;
    }

  }

  soloActivos(event:any){
    this.proyectos = event.target.checked ? this.proyectosActivos : this.allProyectos;    
  }
  
  seleccionarFile(event:any){
    this.archivoSeleccionado = event.target.files[0];
  }

  mostrarRecursos(proyecto:any){
    this.proyectoActivo = proyecto.desproyecto;
    this.backendService.listarProyectoRecursosPorIdProyecto(parseInt(proyecto.idproyecto)).subscribe(
      resp => {
        this.proyectoRecursos = resp;
      }
    )
  }

  sacarRecursos(){
    this.proyectoRecursos = [];
    this.proyectoActivo = ';';
  }

  deletePR(idproyecto: number, idpersonal: number){
    if(idpersonal === this.userID){
      Swal.fire('No se puede eliminar al responsable del proyecto');
      return;
    }

    Swal.fire({
      title: 'Desea eliminar este recurso?',
      showDenyButton: true,
      confirmButtonText: `Si, eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.backendService.eliminarProyectoRecursos(idproyecto, idpersonal).subscribe(
          resp => {
            this.backendService.listarProyectoRecursosPorIdProyecto(idproyecto).subscribe(
              resp => {
                this.proyectoRecursos = resp;
              });
          }
        )
      }
    })
  }

  submitProyecto(){
    
    //reinicio
    this.proyectoHomologados = [];
    this.modalContent = 0;

    if(this.allProyectos.find(proyecto => proyecto.desproyecto.toLowerCase() === this.nuevoProyectoForm.value.nombreProyecto.toLowerCase())){
      //Actualizar
      this.modalContent = 4;
    } else{
      //Guardar
      this.guardarProyecto();
    }
  }

  actualizarProyecto(){

    this.modalContent = 0;
    this.fd = new FormData();
    this.fd.append('file', this.archivoSeleccionado);
    this.fd.append('nombreproyecto', this.nuevoProyectoForm.value.nombreProyecto);
    this.fd.append('idpersonal', JSON.parse(localStorage.getItem('user')!).idUser);

    //Actualizando Proyecto
    this.backendService.actualizarProyecto(this.fd).subscribe(
      resp => {
        this.fd.append('idproyecto', resp.idproyecto);
        this.nuevoProyectoForm.reset();
        this.getProyectos();
        this.subiendoTexto = 'Actualizando Gantt...';
        this.backendService.guardarProyectoGantt(this.fd).subscribe(resp => {this.subiendoTexto = 'Actualizando recursos...'}); 
        this.backendService.guardarProyectoHomologados(this.fd).subscribe(resp => {
          if(resp.length !== 0){
            this.proyectoHomologados = resp;
            this.modalContent = 1;
            this.subiendoTexto = 'Homologando Recursos...'
          } else {
            this.submitPH();

          }
          //y despues???las tareas y recursos???
        });
        
      },
      err => {
        console.log('Ocurrio un error subiendo el archivo, intentalo de nuevo mas tarde');
        Swal.fire('Ocurrio un error actualizando el archivo', '', 'error');
      }
    ) 
  }

  guardarProyecto(){
    this.backendService.existeProyecto(this.nuevoProyectoForm.value.nombreProyecto).subscribe(
      resp => {
        if(resp){
          this.modalContent = 3;
        }else{
          this.fd = new FormData();
          this.fd.append('file', this.archivoSeleccionado);
          this.fd.append('idempresa', this.nuevoProyectoForm.value.cliente);
          this.fd.append('nombreproyecto', this.nuevoProyectoForm.value.nombreProyecto);
          this.fd.append('idpersonal', JSON.parse(localStorage.getItem('user')!).idUser);
          this.modalContent = 0;

          //Guardando Proyecto
          this.backendService.guardarProyecto(this.fd).subscribe(
            resp => {
              this.fd.append('idproyecto', resp.idproyecto);
              this.nuevoProyectoForm.reset();
              this.getProyectos();
              this.subiendoTexto = 'Subiendo Gantt...';
              this.backendService.guardarProyectoGantt(this.fd).subscribe(resp => {this.subiendoTexto = 'Extrayendo recursos...'});
              this.backendService.guardarProyectoHomologados(this.fd).subscribe(resp => {
                this.proyectoHomologados = resp;
                this.modalContent = 1;
                this.subiendoTexto = 'Homologando Recursos...'
              });
            },
            err => {
              console.log('Ocurrio un error subiendo el archivo, intentalo de nuevo mas tarde');
            }
          )
        }
      }
    )
  }

  async submitPH(){

    this.modalContent = 0;

    for(let ph of this.proyectoHomologados){
      await this.backendService.actualizarProyectoHomologados(ph);
    }
    this.subiendoTexto = 'Guardando recursos...';

    this.crearProyectoRecursos();
    
    this.backendService.guardarProyectoTareas(this.fd).subscribe(resp => {
      this.subiendoTexto = '';
      this.modalContent = 2;
    })
  }

  crearProyectoRecursos(){
    let recursosGuardados:number[] = [this.userID];

    if(this.proyectoHomologados.length === 0){
      this.subiendoTexto = 'Guardando tareas...';
      return;
    }

    for(let ph of this.proyectoHomologados){
      if(recursosGuardados.includes(ph.idpersonal!)) continue;
      recursosGuardados.push(ph.idpersonal!);
      const pr:ProyectoRecurso = {
        idproyecto: ph.idproyecto,
        idpersonal: ph.idpersonal!,
        tipo_recurso: 'COL',
        fecini_lab: null,
        fecfin_lab: null,
        fecfin_real: null,
      }
      this.backendService.guardarProyectoRecursos(pr).subscribe(resp => {this.subiendoTexto = 'Guardando tareas...'})
    }
  }
}

//TODO: 
//MANEJAR EL ACTUALIZADO
//Arreglar lo del modal, en casos cuando sale el sweet alert el modal lo tapa, pasar el contenido del sweet alert dentro del modal con un switch se va llendo por la caras necesarias
//eliminar recursos inexistentes (que lo haga el usuario cuando pone administrar recursos)