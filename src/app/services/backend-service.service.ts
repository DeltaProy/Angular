import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { TipoDoc } from '../interfaces/tablasModels';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {

  baseURL: string = environment.baseURL;

  constructor(
    private http: HttpClient
  ) { }

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

}
