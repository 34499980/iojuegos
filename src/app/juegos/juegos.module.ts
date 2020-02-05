import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { TATETIComponent } from './tateti/tateti.component'
import { GENERALAComponent } from './Generala/generala.component';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { VecUsuario } from '../usuarios/usuario/VecUsuarios';
import { GENERALAObligadaComponent } from './GeneralaObligada/generala.component';



@NgModule({
  declarations: [TATETIComponent,GENERALAComponent,GENERALAObligadaComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    UsuariosModule
  ],
  providers:[],
  exports:[TATETIComponent,GENERALAComponent,GENERALAObligadaComponent]
})
export class JuegosModule { }
