import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { Area, Peticion, PeticionDet, Personal, GuardarProyecto, ProyectoHomologado, ProyectoRecurso } from '../interfaces/tablasModels';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {

  baseURL: string = "http://173.255.202.95:8085" //environment.baseURL http://173.255.202.95:8085;

  userId:number | null = null;
 
  constructor(
    private http: HttpClient
  ) {
    if(localStorage.getItem('user')){
      this.userId = JSON.parse(localStorage.getItem('user')!).idUser;
    }
  }

  //Tipos docs CRUD
  listarTiposDocs():Observable<any>{
    return this.http.get(`${this.baseURL}/tiposdocs/listar`);
  }
  guardarTiposDocs(item:any){
    return this.http.post(`${this.baseURL}/tiposdocs/guardar`, item);
  }
  eliminarTiposDocs(id:number){
    return this.http.delete(`${this.baseURL}/tiposdocs/eliminar/${id}`, {responseType: 'text'});
  }

  //Empresas CRUD
  listarEmpresas():Observable<any>{
    return this.http.get(`${this.baseURL}/empresas/listar`);
  }
  guardarEmpresas(item:any){
    return this.http.post(`${this.baseURL}/empresas/guardar`, item);
  }
  eliminarEmpresas(id:number){
    return this.http.delete(`${this.baseURL}/empresas/eliminar/${id}`, {responseType: 'text'});
  }
  
  //Areas CRUD
  listarAreas():Observable<any>{
    return this.http.get(`${this.baseURL}/area/listar`);
  }
  listarArea(idarea:number):Observable<any>{
    return this.http.get(`${this.baseURL}/area/listarArea/${idarea}`);
  }
  guardarAreas(item:any){
    return this.http.post(`${this.baseURL}/area/guardar`, item);
  }
  eliminarAreas(id:number, recursivo:boolean = false){
    if(recursivo){
      return this.http.delete(`${this.baseURL}/area/eliminar/${id}/1`, {responseType: 'text'});
    }else{
      return this.http.delete(`${this.baseURL}/area/eliminar/${id}`, {responseType: 'text'});
    }
  }
  
  //Cargos CRUD
  listarCargos():Observable<any>{
    return this.http.get(`${this.baseURL}/cargo/listar`);
  }
  guardarCargos(item:any){
    return this.http.post(`${this.baseURL}/cargo/guardar`, item);
  }
  eliminarCargos(idcargo:number, idarea:number){
    return this.http.delete(`${this.baseURL}/cargo/eliminar/${idcargo}/${idarea}`, {responseType: 'text'});
  }

  //Tipo Soft CRUD
  listarTipoSoft():Observable<any>{
    return this.http.get(`${this.baseURL}/tipossoft/listar`);
  }
  guardarTipoSoft(item:any){
    return this.http.post(`${this.baseURL}/tipossoft/guardar`, item);
  }
  eliminarTipoSoft(idtiposoft:number){
    return this.http.delete(`${this.baseURL}/tipossoft/eliminar/${idtiposoft}`, {responseType: 'text'});
  }

  //Software CRUD
  listarSoftware():Observable<any>{
    return this.http.get(`${this.baseURL}/softwares/listar`);
  }
  guardarSoftware(item:any){
    return this.http.post(`${this.baseURL}/softwares/guardar`, item);
  }
  eliminarSoftware(idsoft:number){
    return this.http.delete(`${this.baseURL}/softwares/eliminar/${idsoft}`, {responseType: 'text'});
  }

  //Tipo direccion CRUD
  listarTiposDireccion():Observable<any>{
    return this.http.get(`${this.baseURL}/tiposdirec/listar`);
  }
  guardarTiposDireccion(item:any){
    return this.http.post(`${this.baseURL}/tiposdirec/guardar`, item);
  }
  eliminarTiposDireccion(id:number){
    return this.http.delete(`${this.baseURL}/tiposdirec/eliminar/${id}`, {responseType: 'text'});
  }

  //Tipo telefono CRUD
  listarTiposTelefono():Observable<any>{
    return this.http.get(`${this.baseURL}/tipostelfs/listar`);
  }
  guardarTiposTelefono(item:any){
    return this.http.post(`${this.baseURL}/tipostelfs/guardar`, item);
  }
  eliminarTiposTelefono(id:number){
    return this.http.delete(`${this.baseURL}/tipostelfs/eliminar/${id}`, {responseType: 'text'});
  }

  //Tipo email CRUD
  listarTiposEmail():Observable<any>{
    return this.http.get(`${this.baseURL}/tiposemails/listar`);
  }
  guardarTiposEmail(item:any){
    return this.http.post(`${this.baseURL}/tiposemails/guardar`, item);
  }
  eliminarTiposEmail(id:number){
    return this.http.delete(`${this.baseURL}/tiposemails/eliminar/${id}`, {responseType: 'text'});
  }
  
  //Peticiones
  listarPeticionesUsuario():Observable<any>{
    if(this.userId){
      return this.http.get(`${this.baseURL}/peticion/listarUsuario/${this.userId}`);
    } else{
      return of('Error, no existe el usuario');
    }
  }
  listarPeticionesPendientes():Observable<any>{
    if(this.userId){
      return this.http.get(`${this.baseURL}/peticion/listarPendientes/${this.userId}`)
    } else{
      return of(null);
    }
  }
  listarTareasPeticion():Observable<any>{
    if(this.userId){
      return this.http.get(`${this.baseURL}/peticion/listarAsignado/${this.userId}`)
    } else{
      return of(null);
    }
  }
  guardarPeticion(peticion:Peticion):Observable<any>{
    return this.http.post(`${this.baseURL}/peticion/guardar`, peticion);
  }
  actualizarPeticion(peticion:Peticion):Observable<any>{
    return this.http.put(`${this.baseURL}/peticion/actualizar`, peticion);
  }

  //Peticiones Detalles
  guardarPeticionDet(peticionDet:PeticionDet):Observable<any>{
    return this.http.post(`${this.baseURL}/peticionDet/guardar`, peticionDet);
  }

  //Personal CRUD
  buscarPersonal(idpersonal:number):Observable<any>{
    return this.http.get(`${this.baseURL}/personal/buscar/${idpersonal}`);
  }
  buscarPersonalPorNombre(nomper:string, apeper:string):Observable<any>{
    return this.http.get(`${this.baseURL}/personal/buscar/${nomper}/${apeper}`);
  }
  listaPersonalPorArea(idarea:number):Observable<any>{
    return this.http.get(`${this.baseURL}/personal/listarArea/${idarea}`);
  }
  listarPersonal():Observable<any>{
    return this.http.get(`${this.baseURL}/personal/listar`);
  }
  
  //Proyectos CRUD
  listarProyectos():Observable<any>{
    return this.http.get(`${this.baseURL}/proyectos/listar`);
  }
  existeProyecto(nombre:string):Observable<any>{
    return this.http.get(`${this.baseURL}/proyectos/existe`, {params:{"nombreproyecto":nombre}});
  }
  listarProyectosPorResponsable(idresponsable:number):Observable<any>{
    return this.http.get(`${this.baseURL}/proyectos/listar/${idresponsable}`);
  }
  guardarProyecto(fd: FormData):Observable<any>{
    return this.http.post(`${this.baseURL}/proyectos/guardar`, fd)
  }
  actualizarProyecto(fd: FormData):Observable<any>{
    return this.http.put(`${this.baseURL}/proyectos/actualizar`, fd)
  }

  //Proyecto Gantt CRUD
  guardarProyectoGantt(fd:FormData):Observable<any>{
    return this.http.post(`${this.baseURL}/proyectoGantt/guardar`, fd)
  }

  
  //Proyecto Homologados
  listarProyectoHomologadosPorIdProyecto(idproyecto: number):Observable<any>{
    return this.http.get(`${this.baseURL}/proyectoHomologados/listar/${idproyecto}`)
  }
  guardarProyectoHomologados(fd:FormData):Observable<any>{
    return this.http.post(`${this.baseURL}/proyectoHomologados/guardar`, fd)
  }
  actualizarProyectoHomologados(ph:any){
    return this.http.post(`${this.baseURL}/proyectoHomologados/actualizar`, ph).toPromise();
  }

  //Proyecto Tareas
  guardarProyectoTareas(fd:FormData):Observable<any>{
    return this.http.post(`${this.baseURL}/proyectoTareas/guardar`, fd, {responseType: 'text'})
  }
  
  //Proyecto Recursos
  listarProyectoRecursosPorIdProyecto(idproyecto: number):Observable<any>{
    return this.http.get(`${this.baseURL}/proyectoRecursos/listar/${idproyecto}`);
  }
  guardarProyectoRecursos(pr:ProyectoRecurso):Observable<any>{
    return this.http.post(`${this.baseURL}/proyectoRecursos/guardar`, pr);
  }
  actualizarProyectoRecurso(pr:ProyectoRecurso){
    return this.http.put(`${this.baseURL}/proyectoRecursos/actualizar`, pr);
  }
  eliminarProyectoRecursos(idproyecto: number, idpersonal: number):Observable<any>{
    return this.http.delete(`${this.baseURL}/proyectoRecursos/eliminar/${idproyecto}/${idpersonal}`, {responseType: 'text'});
  }
}
