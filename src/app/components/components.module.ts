import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { HomeComponent } from './home/home.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { BodyComponent } from './body/body.component';
import { MenuComponent } from './menu/menu.component';
import { TipoDocsComponent } from './masterTablas/tipo-docs/tipo-docs.component';
import { EmpresasComponent } from './masterTablas/empresas/empresas.component';
import { TipoDireccionComponent } from './masterTablas/tipo-direccion/tipo-direccion.component';
import { TipoTelefonoComponent } from './masterTablas/tipo-telefono/tipo-telefono.component';
import { TipoEmailsComponent } from './masterTablas/tipo-emails/tipo-emails.component';
import { AreasCargosComponent } from './masterTablas/areas-cargos/areas-cargos.component';
import { SoftwareTiposComponent } from './masterTablas/software-tipos/software-tipos.component';
import { SolicitudesComponent } from './masterTablas/solicitudes/solicitudes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PeticionComponent } from './masterTablas/solicitudes/peticion/peticion.component';
import { PeticionesPendientesComponent } from './masterTablas/solicitudes/peticiones-pendientes/peticiones-pendientes.component';
import { TareasPeticionComponent } from './masterTablas/solicitudes/tareas-peticion/tareas-peticion.component';


@NgModule({
  declarations: [
    HomeComponent,
    UsuarioComponent,
    CabeceraComponent,
    BodyComponent,
    MenuComponent,
    TipoDocsComponent,
    EmpresasComponent,
    TipoDireccionComponent,
    TipoTelefonoComponent,
    TipoEmailsComponent,
    AreasCargosComponent,
    SoftwareTiposComponent,
    SolicitudesComponent,
    PeticionComponent,
    PeticionesPendientesComponent,
    TareasPeticionComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
