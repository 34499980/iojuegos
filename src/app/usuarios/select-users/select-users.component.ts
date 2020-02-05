import { Component, OnInit, Injectable, Inject, Output } from '@angular/core';
import { Usuario } from '../usuario/usuario.component';
import {Router,ActivatedRoute } from "@angular/router"
import { VecUsuario } from '../usuario/VecUsuarios';


@Component({
  selector: 'app-select-users',
  templateUrl: './select-users.component.html',
  styleUrls: ['./select-users.component.css']
})
export class SelectUsersComponent implements OnInit {
  jugador1 = ''
  jugador2 = ''
   vecUser : VecUsuario;
   juego: any

  constructor(private router: Router, private activateRoute: ActivatedRoute ) { 
   this.vecUser = VecUsuario.getInstance();
  
   
  }

  ngOnInit() {
    this.activateRoute.data.subscribe(data => {
       this.juego = data.juego,
       console.log(data)
      
    })
  }
  IniciarJuego(){
    if(this.jugador1 != '' && this.jugador2 != ''){
    this.vecUser.push(new Usuario(this.jugador1,1,this.juego))
    this.vecUser.push(new Usuario(this.jugador2,2,this.juego))
    this.router.navigate([this.juego])
    /*switch(this.juego){
      case 'TATETI':
      this.router.navigate(['TATETI'])
      break;
      case 'GENERALA':
      this.router.navigate(['GENERALA'])
      break;
      case 'GENERALAOBLIGADA':
        this.router.navigate(['GENERALA'])
        break;
    }*/
   
    }else{
      alert('Ingrese nombre de jugadores!')
    }
  }
}
