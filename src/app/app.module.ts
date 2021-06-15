import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { BodyComponent } from './components/body/body.component';
import { MenuComponent } from './components/menu/menu.component';
import { TipoDocsComponent } from './components/masterTablas/tipo-docs/tipo-docs.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EmpresasComponent } from './components/masterTablas/empresas/empresas.component';
import { TipoDireccionComponent } from './components/masterTablas/tipo-direccion/tipo-direccion.component';
import { TipoTelefonoComponent } from './components/masterTablas/tipo-telefono/tipo-telefono.component';
import { TipoEmailsComponent } from './components/masterTablas/tipo-emails/tipo-emails.component';
import { TableModule } from 'primeng/table';
import { AreasCargosComponent } from './components/masterTablas/areas-cargos/areas-cargos.component';
import { SoftwareTiposComponent } from './components/masterTablas/software-tipos/software-tipos.component';

@NgModule({
  declarations: [
    AppComponent,
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
    SoftwareTiposComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
