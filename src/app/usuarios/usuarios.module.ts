import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { SelectUsersComponent } from './select-users/select-users.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { VecUsuario } from './usuario/VecUsuarios';
import { puntaje } from './usuario/usuario.component';



@NgModule({
  declarations: [ SelectUsersComponent],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  providers:[],
  exports:[SelectUsersComponent]
})
export class UsuariosModule { }
