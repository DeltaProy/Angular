import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresasComponent } from './components/masterTablas/empresas/empresas.component';
import { TipoDocsComponent } from './components/masterTablas/tipo-docs/tipo-docs.component';
import { TipoDireccionComponent } from './components/masterTablas/tipo-direccion/tipo-direccion.component';
import { TipoTelefonoComponent } from './components/masterTablas/tipo-telefono/tipo-telefono.component';
import { TipoEmailsComponent } from './components/masterTablas/tipo-emails/tipo-emails.component';
import { AreasCargosComponent } from './components/masterTablas/areas-cargos/areas-cargos.component';
import { SoftwareTiposComponent } from './components/masterTablas/software-tipos/software-tipos.component';

const routes: Routes = [
  {path: "tipodocs", component: TipoDocsComponent},
  {path: "empresas", component: EmpresasComponent},
  {path: "areascargos", component: AreasCargosComponent},
  {path: "softwares", component: SoftwareTiposComponent},
  {path: "tipodireccion", component: TipoDireccionComponent},
  {path: "tipotelefono", component: TipoTelefonoComponent},
  {path: "tipoemails", component: TipoEmailsComponent},


  {path: "**", redirectTo: 'tipodocs'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
