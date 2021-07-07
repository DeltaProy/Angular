import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: "auth", loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)},

  {path: "home", loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)},


  {path: "**", redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
