import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresasComponent } from './masterTablas/empresas/empresas.component';
import { TipoDocsComponent } from './masterTablas/tipo-docs/tipo-docs.component';
import { TipoDireccionComponent } from './masterTablas/tipo-direccion/tipo-direccion.component';
import { TipoTelefonoComponent } from './masterTablas/tipo-telefono/tipo-telefono.component';
import { TipoEmailsComponent } from './masterTablas/tipo-emails/tipo-emails.component';
import { AreasCargosComponent } from './masterTablas/areas-cargos/areas-cargos.component';
import { SoftwareTiposComponent } from './masterTablas/software-tipos/software-tipos.component';
import { SolicitudesComponent } from './masterTablas/solicitudes/solicitudes.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
    children:[
      {path: "master/tipodocs", component: TipoDocsComponent},
      {path: "master/empresas", component: EmpresasComponent},
      {path: "master/areascargos", component: AreasCargosComponent},
      {path: "master/softwares", component: SoftwareTiposComponent},
      {path: "master/tipodireccion", component: TipoDireccionComponent},
      {path: "master/tipotelefono", component: TipoTelefonoComponent},
      {path: "master/tipoemails", component: TipoEmailsComponent},
      
      {path: "solicitudes", component: SolicitudesComponent},

      {path: "**", redirectTo: "master/tipodocs"}
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
