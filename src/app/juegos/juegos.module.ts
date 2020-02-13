import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { TATETIComponent } from './tateti/tateti.component'
import { GENERALAComponent } from './Generala/generala.component';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { VecUsuario } from '../usuarios/usuario/VecUsuarios';
import { GENERALAObligadaComponent } from './GeneralaObligada/generala.component';
import { DiezMilComponent } from './Diezmil/DiezMil.component';



@NgModule({
  declarations: [TATETIComponent,GENERALAComponent,GENERALAObligadaComponent,DiezMilComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    UsuariosModule
  ],
  providers:[],
  exports:[TATETIComponent,GENERALAComponent,GENERALAObligadaComponent,DiezMilComponent]
})
export class JuegosModule { }
