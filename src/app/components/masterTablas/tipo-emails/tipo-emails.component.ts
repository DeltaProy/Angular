import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoEmail } from 'src/app/interfaces/tablasModels';
import { BackendServiceService } from 'src/app/services/backend-service.service';

@Component({
  selector: 'app-tipo-emails',
  templateUrl: './tipo-emails.component.html',
  styleUrls: ['./tipo-emails.component.css']
})
export class TipoEmailsComponent implements OnInit {

  tiposEmail: TipoEmail[] = [];
  isEdit: boolean = false;
  itemId!: number;

  registro: FormGroup = this.fb.group({
    destipoemail: ['', [Validators.required, Validators.maxLength(45)]]
  })

  constructor(
    private backendService: BackendServiceService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.actualizarTiposEmail();
  }

  guardar() {
    let tipoemail;
    if(this.isEdit){
      tipoemail = {
        idtipoemail: this.itemId,
        destipoemail: this.registro.value.destipoemail,
      }
    }else{
      tipoemail = {
        destipoemail: this.registro.value.destipoemail,
      }
    }

    this.backendService.guardarTiposEmail(tipoemail).subscribe(
      resp => {
        this.actualizarTiposEmail();
      },
      err => {
        console.log(err);
        console.log("Ocurrio un error guardando el item");
      }
    )
    this.registro.reset();
    this.isEdit = false;
  }

  eliminar(item: TipoEmail) {
    this.backendService.eliminarTiposEmail(item.idtipoemail).subscribe(
      resp => {
      console.log(resp);
      this.actualizarTiposEmail();
      },
      err => {
        console.log('Ocurrio un error, no se puedo eliminar el registro.');
        console.log(err);
      }
    );
  }

  actualizarTiposEmail() {
    this.backendService.listarTiposEmail().subscribe((response) => {
      this.tiposEmail = response;
    });
  }

  llenarCampos(item:TipoEmail){
    this.isEdit = true;
    this.itemId = item.idtipoemail;
    this.registro.setValue({
      destipoemail: item.destipoemail
    })
  }
}
