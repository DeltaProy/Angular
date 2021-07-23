import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path: "auth", loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)},

  { 
    path: "home", 
    loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },


  {path: "**", redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
