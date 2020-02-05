import { Component, OnInit, Input } from '@angular/core';

import { VecUsuario } from 'src/app/usuarios/usuario/VecUsuarios';


@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.css']
})
export class TATETIComponent implements OnInit {
   vecUser : VecUsuario
  posiciones=[['-','-','-'],
  ['-','-','-'],
  ['-','-','-']];
 
  usuario='';
  jugador='O';
  constructor(private vecUsers : VecUsuario){
    this.vecUser = VecUsuario.getInstance();
    
   }

  ngOnInit() {
    this.usuario = this.vecUser["vec"][0]._nombre;
  }

  presion(fila:number,columna:number) {
    if (this.posiciones[fila][columna]=='-') {
      this.posiciones[fila][columna]=this.jugador;
      this.verificarGano('X');
      this.verificarGano('O');
      this.cambiarJugador();
    }
  }
    reiniciar() {
      for(let f=0;f<3;f++)
        for(let c=0;c<3;c++)
          this.posiciones[f][c]='-';
 
    }

    verificarGano(ficha: string) {
      if (this.posiciones[0][0]==ficha && this.posiciones[0][1]==ficha && this.posiciones[0][2]==ficha)
        alert('Gano:'+this.usuario);
      if (this.posiciones[1][0]==ficha && this.posiciones[1][1]==ficha && this.posiciones[1][2]==ficha)
        alert('Gano:'+this.usuario);
      if (this.posiciones[2][0]==ficha && this.posiciones[2][1]==ficha && this.posiciones[2][2]==ficha)
        alert('Gano:'+this.usuario);
      if (this.posiciones[0][0]==ficha && this.posiciones[1][0]==ficha && this.posiciones[2][0]==ficha)
        alert('Gano:'+this.usuario);
      if (this.posiciones[0][1]==ficha && this.posiciones[1][1]==ficha && this.posiciones[2][1]==ficha)
        alert('Gano:'+this.usuario);
      if (this.posiciones[0][2]==ficha && this.posiciones[1][2]==ficha && this.posiciones[2][2]==ficha)
        alert('Gano:'+this.usuario);      
      if (this.posiciones[0][0]==ficha && this.posiciones[1][1]==ficha && this.posiciones[2][2]==ficha)
        alert('Gano:'+this.usuario);
      if (this.posiciones[0][2]==ficha && this.posiciones[1][1]==ficha && this.posiciones[2][0]==ficha)
        alert('Gano:'+this.usuario);      
    }

    cambiarJugador() {
      if (this.jugador=='O'){
        this.jugador='X';
        this.usuario = this.vecUser["vec"][1]._nombre;
      }else{
        this.jugador='O'; 
        this.usuario = this.vecUser["vec"][0]._nombre;
      }
    }

}
