export class Usuario{
  public _nombre;
  public _jugador;
  public _puntajes: puntaje[]=[] 

  constructor(nombre: String,jugador: number, valor?: String){
    this._nombre = nombre;
    this._jugador = jugador;
    /*if(valor != null){
      this.CargarPuntaje(valor)
    }*/
  }
 /* private CargarPuntaje(juego: String){
    switch(juego){
      case 'GENERALA':
      this._puntajes.push(new puntaje('1','-'))
      this._puntajes.push(new puntaje('2','-'))
      this._puntajes.push(new puntaje('3','-'))
      this._puntajes.push(new puntaje('4','-'))
      this._puntajes.push(new puntaje('5','-'))
      this._puntajes.push(new puntaje('6','-'))
      this._puntajes.push(new puntaje('Escalera','-'))
      this._puntajes.push(new puntaje('Full','-'))
      this._puntajes.push(new puntaje('Poker','-'))
      this._puntajes.push(new puntaje('Generala','-'))
      this._puntajes.push(new puntaje('Generala doble','-'))
      break;
      case 'GENERALAOBLIGADA':
        this._puntajes.push(new puntaje('1','-'))
        this._puntajes.push(new puntaje('2','-'))
        this._puntajes.push(new puntaje('3','-'))
        this._puntajes.push(new puntaje('4','-'))
        this._puntajes.push(new puntaje('5','-'))
        this._puntajes.push(new puntaje('6','-'))
        this._puntajes.push(new puntaje('Escalera','-'))
        this._puntajes.push(new puntaje('Full','-'))
        this._puntajes.push(new puntaje('Poker','-'))
        this._puntajes.push(new puntaje('Generala','-'))
        this._puntajes.push(new puntaje('Generala doble','-'))
        break;
    }
  }*/


}
export class puntaje{
    _nombre: String
    _valor: String
    constructor(nombre: String, valor: String){
      this._nombre = nombre;
      this._valor = valor;
    }
}