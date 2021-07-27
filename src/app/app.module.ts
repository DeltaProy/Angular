import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { AuthModule } from './auth/auth.module';
import { ComponentsModule } from './components/components.module';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    TableModule,
    AuthModule,
    ComponentsModule
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/deltaIntranet/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
