import { Component, OnInit } from '@angular/core';
import { DadoComponent } from './dado.component';
import { VecUsuario } from 'src/app/usuarios/usuario/VecUsuarios';
import { Validators } from '@angular/forms';
import { BindingFlags } from '@angular/compiler/src/core';
import { puntaje } from 'src/app/usuarios/usuario/usuario.component';

@Component({
  selector: 'app-DiezMil',
  templateUrl: './DiezMil.component.html',
  styleUrls: ['./DiezMil.component.css']
})
export class DiezMilComponent implements OnInit {
  dados: DadoComponent[] = []
  vecUser : VecUsuario
  cantidad: number;
  usuario =''
  usuarioID = 0
  selectedCount = 0
  puntaje: any
  turno: String = 'Jugar'
  totales: number = 0
  ganador: String
  value: number = 0;
  partida: number = 0;
  tiros: number = 0;
  acumulado: number = 0;
  vecPuntaje: DadoComponent[] =[];
  constructor() { 
    this.vecUser = VecUsuario.getInstance();
  }

  ngOnInit() {
    this.cantidad = 5;
    for(let i=0; i<this.cantidad;i++){
      this.dados.push(new DadoComponent(i))
    }
    for(let i=0; i<this.cantidad;i++){
      this.dados[i].valor = Math.trunc(Math.random()*6)+1;
    }   
    for(let i = 0; i < this.vecUser["vec"].length; i++){
      this.vecUser["vec"][i]._puntajes.push(new puntaje('Total','0'))
     
      
    }  
    this.cambiarJugador();
  }
  public lanzar(){ 
    let flag: boolean = true
    for(let i=0; i<this.cantidad;i++){
      if(!this.dados[i].selected)
         flag = false;
    }
    if(!flag || this.tiros == 0){     
      this.tiros++;
      this.acumulado += this.partida; 

      this.partida = 0;
      if(this.selectedCount != this.cantidad){
      for(let i=0; i<this.cantidad;i++){
          if(this.dados[i].selected)
            this.dados[i].lanzar();
        }
      }else{
        this.selectedCount = 0;
        for(let i=0; i<this.cantidad;i++){
          this.dados[i].selected = true;
          this.dados[i].lanzar();
        }     
        //this.vecPuntaje =[];        
        //this.lanzar();
      }
      let vecAux: DadoComponent[] = [];
      for(let i = 0; i<this.cantidad;i++){
        let ID = this.dados[i].ID
        let valor = this.dados[i].valor
        let selected = this.dados[i].selected
        let tiros = this.tiros
        if(this.vecPuntaje.find(x => x.ID == this.dados[i].ID)==undefined){
            vecAux.push(new DadoComponent(ID,valor,selected,tiros))
        }
      }
      if(this.ValidarIguales(vecAux)==0){
        this.cambiarJugador();
        
      }
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
    this.totales = Number(this.vecUser["vec"][this.usuarioID]._puntajes[0]._valor)     
    this.ReiniciarDados()
    this.partida = 0;
    this.acumulado = 0;
    this.tiros = 0;
   
   
  }
  public Select(index: number){
     if(this.dados[index].selected){
        this.dados[index].selected=false;
        this.selectedCount++
        for(let i=0; i<this.cantidad;i++){
          if(!this.dados[i].selected){
            let index = this.vecPuntaje.find(x => x.ID == this.dados[i].ID )
            if(index == undefined){
              let ID = this.dados[i].ID
              let valor = this.dados[i].valor
              let selected = this.dados[i].selected
              let tiros = this.tiros
               this.vecPuntaje.push(new DadoComponent(ID,valor,selected,tiros))
            }
          }
        }
     }else{      
       if(this.vecPuntaje[index].tiro == this.tiros){
           this.vecPuntaje.splice(index,1);
           this.dados[index].selected=true;
           this.selectedCount--
       }
     }     
    this.vecPuntaje.sort();
    if(this.selectedCount == 5){
      this.value = this.ValidarEscalera(this.vecPuntaje);
    }
    this.value = this.ValidarIguales(this.vecPuntaje);
    this.partida = this.value
  }
  private ReiniciarDados(){
    for(let i=0; i<this.cantidad;i++)     
      this.dados[i].selected = true;
  }
  public MarcarPuntaje(){
    if((Number(this.vecUser["vec"][this.usuarioID]._puntajes[0]._valor) == 0 && this.acumulado == 750)||((Number(this.vecUser["vec"][this.usuarioID]._puntajes[0]._valor)>750))){
       this.vecUser["vec"][this.usuarioID]._puntajes[0]._valor = String(Number(this.vecUser["vec"][this.usuarioID]._puntajes[0]._valor)+ this.acumulado+this.partida)
    
      let vecPuntaje: number[] =[]
     this.acumulado = 0;
  
     this.turno = 'Jugar';
    
     if(this.ValidarFinal()){
        alert('El ganador es: '+ this.ganador)
     }else{ 
       this.cambiarJugador()
     }
  }
  
    
  }
  
  public ValidarEscalera(array: any[]):number{
    let i = 0;
   
    while(i < array.length-1){ 
      if(array[i].valor != array[i+1].valor-1){
        return 0
      }
    }
    if(array[0].valor == 1 && array[1].valor == 3
       && array[2].valor == 4 && array[3].valor == 5
        && array[4].valor == 6){
          return 0
        }
    return 500;   
  }
  public ValidarIguales(array: any[]):number{  
    let cont : number= 0        
    let Selectvalue : number = 0;
    let value : number = 0;
    let arrayUsados: any [] = [];
    let i = 0;
   
   
    if(array.length > 1){
    for(let i = 0; i<=array.length-2; i++){
        if(array[i].valor==array[i+1].valor && array[i].tiro== this.tiros && array[i+1].tiro == this.tiros){
          cont++;
          Selectvalue = array[i].valor;
          arrayUsados.push(array[i].ID)
        }
      }
    }
    if(cont==3){
      value = Selectvalue * 100;
    }
    for(let i = 0; i<= array.length-1;i++){
      if(arrayUsados.find(x => x.ID == array[i].ID)==undefined && array[i].tiro == this.tiros){
        switch(array[i].valor){
          case 1:
           value += 100;
           break;
          case 5:
            value += 50;
           break;
        }
      }
    }
    
    return value;
  }
 
  public ValidarFinal():boolean{
    let bFinal: boolean = false
    let vecGanador: any[] = []
   if(Number(this.vecUser["vec"][this.usuarioID]._puntajes[0]._valor) < 10000 || Number(this.vecUser["vec"][this.usuarioID]._puntajes[0]._valor)==NaN){
      bFinal = false;
   }   
    
    return bFinal;
  }
  

}
