import { Component, OnInit } from '@angular/core';
import { DadoComponent } from './dado.component';
import { VecUsuario } from 'src/app/usuarios/usuario/VecUsuarios';
import { Validators } from '@angular/forms';
import { BindingFlags } from '@angular/compiler/src/core';
import { puntaje } from 'src/app/usuarios/usuario/usuario.component';

@Component({
  selector: 'app-generala',
  templateUrl: './generala.component.html',
  styleUrls: ['./generala.component.css']
})
export class GENERALAComponent implements OnInit {
  dados: DadoComponent[] = []
  vecUser : VecUsuario
  cantidad: number;
  usuario =''
  usuarioID = 0
  tiros = 0
  puntaje: any
  turno: String = 'Jugar'
  totales: number
  ganador: String
  constructor() { 
    this.vecUser = VecUsuario.getInstance();
  }

  ngOnInit() {
    this.cantidad = 5;
    for(let i=0; i<this.cantidad;i++){
      this.dados.push(new DadoComponent)
    }
    for(let i=0; i<this.cantidad;i++){
      this.dados[i].valor = Math.trunc(Math.random()*6)+1;
    }   
    for(let i = 0; i < this.vecUser["vec"].length; i++){
      this.vecUser["vec"][i]._puntajes.push(new puntaje('1','-'))
      this.vecUser["vec"][i]._puntajes.push(new puntaje('2','-'))
      this.vecUser["vec"][i]._puntajes.push(new puntaje('3','-'))
      this.vecUser["vec"][i]._puntajes.push(new puntaje('4','-'))
      this.vecUser["vec"][i]._puntajes.push(new puntaje('5','-'))
      this.vecUser["vec"][i]._puntajes.push(new puntaje('6','-'))
      this.vecUser["vec"][i]._puntajes.push(new puntaje('Escalera','-'))
      this.vecUser["vec"][i]._puntajes.push(new puntaje('Full','-'))
      this.vecUser["vec"][i]._puntajes.push(new puntaje('Poker','-'))
      this.vecUser["vec"][i]._puntajes.push(new puntaje('Generala','-'))
      this.vecUser["vec"][i]._puntajes.push(new puntaje('Generala doble','-'))
    }  
    this.cambiarJugador();
  }
  public lanzar(){
    if(this.tiros != 3 ){
      this.turno = 'Lanzar'
    for(let i=0; i<this.cantidad;i++){
      if(this.dados[i].selected==true)
      this.dados[i].lanzar();
    }
      this.tiros++;
  }else
  if(this.turno == 'Jugar'){
        this.cambiarJugador();   
  }
}
 public cambiarJugador() {
    this.usuario = this.vecUser["vec"][this.usuarioID]._nombre
    this.usuarioID=this.vecUser["vec"][this.usuarioID]._jugador
    let count = this.vecUser["vec"].length;
    if(  Number(this.usuarioID)== count){
      this.usuarioID=0
    }
    this.turno = 'Jugar'
    this.puntaje = this.vecUser["vec"][this.usuarioID]._puntajes;  
    this.totales = this.CalcularTotales(this.vecUser["vec"][this.usuarioID]._puntajes)
    this.ReiniciarDados()
    this.tiros = 0
   
  }
  public Select(index: number){
    if( this.turno == 'Lanzar'){
      if(this.dados[index].selected==true){
        this.dados[index].selected=false;
     }else{
       this.dados[index].selected=true;
     }    
    }
  }
  private ReiniciarDados(){
    for(let i=0; i<this.cantidad;i++)     
      this.dados[i].selected = true;
  }
  public MarcarPuntaje(index: number){
    if(this.turno == 'Lanzar'){
    let posicion = Number(this.vecUser["vec"][this.usuarioID]._puntajes[index]._nombre);
    let vecPuntaje: number[] =[]
    if(this.vecUser["vec"][this.usuarioID]._puntajes[index]._valor == '-'){
      let numero=this.vecUser["vec"][this.usuarioID]._puntajes[index]._valor = '0';
        if(index <= 5){
        let numero2 = Number(this.vecUser["vec"][this.usuarioID]._puntajes[index]._nombre)
        for(let i=0; i<this.cantidad;i++){
          if(this.dados[i].valor==numero2)
          vecPuntaje.push(this.dados[i].valor)
        }
        if(vecPuntaje.length != 0){
          let punto = Number(numero)
          let j = vecPuntaje.length
          for(let i=0; i < j ;i++)
          punto += vecPuntaje.pop();
          
          this.vecUser["vec"][this.usuarioID]._puntajes[index]._valor = String(punto)
        }
      }else{
        for(let i=0; i<this.cantidad;i++)
        vecPuntaje.push(this.dados[i].valor)
        vecPuntaje.sort();
        //this.Sort(vecPuntaje);
        switch(this.vecUser["vec"][this.usuarioID]._puntajes[index]._nombre){
          case 'Escalera':
          if(this.ValidarEscalera(vecPuntaje)){
            if(this.tiros == 1){
              this.vecUser["vec"][this.usuarioID]._puntajes[index]._valor = '30'
            }else{
              this.vecUser["vec"][this.usuarioID]._puntajes[index]._valor = '25'
            }
          }else{
            this.vecUser["vec"][this.usuarioID]._puntajes[index]._valor ='0'
          }
            break;
            case 'Full':
            if(this.ValidarIguales(vecPuntaje,'FULL')){
              if(this.tiros == 1){
                this.vecUser["vec"][this.usuarioID]._puntajes[index]._valor = '35'
              }else{
                this.vecUser["vec"][this.usuarioID]._puntajes[index]._valor = '30'
              }
            }else{
              this.vecUser["vec"][this.usuarioID]._puntajes[index]._valor ='0'
            }
            break;
            case 'Poker':
            if(this.ValidarIguales(vecPuntaje,'POKER')){
              if(this.tiros == 1){
                this.vecUser["vec"][this.usuarioID]._puntajes[index]._valor = '45'
              }else{
                this.vecUser["vec"][this.usuarioID]._puntajes[index]._valor = '40'
              }
            }else{
              this.vecUser["vec"][this.usuarioID]._puntajes[index]._valor ='0'
            }
            break;
            case 'Generala':
            if(this.ValidarIguales(vecPuntaje,'GENERALA')){
              if(this.tiros == 1){
                this.vecUser["vec"][this.usuarioID]._puntajes[index]._valor = '100'
              }else{
                this.vecUser["vec"][this.usuarioID]._puntajes[index]._valor = '50'
              }
            }else{
              this.vecUser["vec"][this.usuarioID]._puntajes[index]._valor ='0'
            }
            break;
            case 'Generala Doble':
            if(this.ValidarIguales(vecPuntaje,'GENERALA DOBLE')){
              if(this.tiros == 1){
                if(this.vecUser["vec"][this.usuarioID]._puntajes[index-1]._valor == '-'){
                  this.vecUser["vec"][this.usuarioID]._puntajes[index-1]._valor = '100'
                }else{
                this.vecUser["vec"][this.usuarioID]._puntajes[index]._valor = '200'
                }
              }else{
                if(this.vecUser["vec"][this.usuarioID]._puntajes[index-1]._valor == '-'){
                  this.vecUser["vec"][this.usuarioID]._puntajes[index-1]._valor = '50'
                }else{
                  this.vecUser["vec"][this.usuarioID]._puntajes[index]._valor = '100'
                }
              
              }
            }else{
              this.vecUser["vec"][this.usuarioID]._puntajes[index]._valor ='0'
            }
            break;
        }

      }
    }
    this.totales = this.CalcularTotales(this.vecUser["vec"][this.usuarioID]._puntajes)
    this.turno = 'Jugar';
    this.tiros = 3;
    if(this.ValidarFinal()){
      alert('El ganador es: '+ this.ganador)
    }
  }
    
  }
  
  public ValidarEscalera(array: any[]):boolean{
    let i = 0;
    let flag: boolean = true;
    while(i < array.length-1 && flag){ 
      if(array[i] != array[i]-1){
        flag = false;
      }
    }
    if(array[0] == 1 && array[1] == 3
       && array[2] == 4 && array[3] == 5
        && array[4] == 6){
          flag = true;
        }
    return flag;   
  }
  public ValidarIguales(array: any[],jugada: String):boolean{
    let flag: boolean = false;
    let anterior
    let cont : number= 1
    let cont2 : number = 0
    let cont3 : number = 0
    let numeros: number = 0
   // let i = 0
    let siguiente : boolean = true;
    for(let i=0; i < array.length-1; i++ ){
      if(array[i] != array[i+1]){
        numeros++;
      }
        switch(numeros){
          case 0:
            cont++;
            break;
           case 1:
              cont2++;
            break;           

        }
        
      
    }   
    flag = false;
    switch(jugada){
      case 'FULL':
        if((cont==2 && cont2 == 3) || (cont==2 && cont2 == 3)){
        flag = true;
        }
      break;
      case 'POKER':
      if((cont==4) || (cont2 == 4)){
        flag = true;
        }
      break;
      case 'GENERALA':
      if((cont==5) || (cont2 == 5)){
        flag = true;
        }
      break;
      case 'GENERALA DOBLE':
      if((cont==5) || (cont2 == 5)){
        flag = true;
        }
      break;
    }
    return flag;
  }
  public CalcularTotales(array: any[]): number{
    let total: number = 0
    for(let i = 0; i<array.length; i++){
      if(array[i]._valor != '-'){
         total+= Number(array[i]._valor)
      }
    }   
     

    return total
  }
  public ValidarFinal():boolean{
    let bFinal: boolean = true
    let vecGanador: any[] = []
    for(let i = 0; i < this.vecUser["vec"].length; i++){
      let valor: number = 0;
      for(let j = 0; j < this.vecUser["vec"][i]._puntajes.length; j++){
        if(this.vecUser["vec"][i]._puntajes[j]._valor != '-'){
          valor += Number(this.vecUser["vec"][i]._puntajes[j]._valor)
        }else{
          bFinal = false;
          break;
        }
        vecGanador.push(this.vecUser["vec"][i]._nombre,valor)
      }
    }
    if(bFinal){
      let max: number=0
      
      for(let i = 0; i < vecGanador.length; i++){
        if(vecGanador[i].valor > max){
          max = vecGanador[i].valor;
        
        }
      }
    }
    return bFinal;
  }

}
