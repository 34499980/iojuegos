import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dado',
  templateUrl: './dado.component.html',
  styleUrls: ['./dado.component.css']
})
export class DadoComponent implements OnInit {
  ID: number;
  valor: number;
  selected: boolean = true;
  tiro: number;
  constructor(i: number,valor?: number, selected?: boolean, tiro?: number) {
    this.ID = i;
    this.valor = valor;
    this.selected = selected;
    this.tiro = tiro;
   }
   

  ngOnInit() {
    this.valor = Math.trunc(Math.random()*6)+1;
  }

  public lanzar(){
    this.valor = Math.trunc(Math.random()*6)+1;
  }

}
