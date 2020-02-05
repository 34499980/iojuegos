import { Usuario } from './usuario.component';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class VecUsuario{
  private static vecUsuario: VecUsuario = null;
  private vec:Usuario[]=[];

 public static getInstance(): VecUsuario {
   if(this.vecUsuario == null){
    this.vecUsuario = new VecUsuario();
   }
   return this.vecUsuario;
 }
   push(user: Usuario){
    this.vec.push(user);
  }
   pop(user: Usuario){
    this.vec.pop();
  }
  private constructor(){
  
  }

}