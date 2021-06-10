import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoDocsComponent } from './components/masterTablas/tipo-docs/tipo-docs.component';

const routes: Routes = [
  {path: "tipodocs", component: TipoDocsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
