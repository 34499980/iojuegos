import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SelectUsersComponent } from './usuarios/select-users/select-users.component';
import { TATETIComponent } from './juegos/tateti/tateti.component';
import { GENERALAComponent } from './juegos/Generala/generala.component';
import { GENERALAObligadaComponent } from './juegos/GeneralaObligada/generala.component';
import { DiezMilComponent } from './juegos/Diezmil/DiezMil.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'user-TATETI',component:SelectUsersComponent,data: {juego:"TATETI"}, pathMatch: 'full' },
  { path: 'TATETI',component:TATETIComponent, pathMatch: 'full' },
  { path: 'user-GENERALA',component:SelectUsersComponent,data: {juego:"GENERALA"}, pathMatch: 'full' },
  { path: 'GENERALA',component:GENERALAComponent, pathMatch: 'full' },
  { path: 'user-GENERALA-Obligada',component:SelectUsersComponent,data: {juego:"GENERALAObligada"}, pathMatch: 'full' },
  { path: 'GENERALAObligada',component:GENERALAObligadaComponent, pathMatch: 'full' },
  { path: 'user-DiezMil',component:SelectUsersComponent,data: {juego:"DiezMil"}, pathMatch: 'full' },
  { path: 'DiezMil',component:DiezMilComponent, pathMatch: 'full' },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
