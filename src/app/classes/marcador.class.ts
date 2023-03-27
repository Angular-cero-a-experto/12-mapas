
export class Marcador {

 
  public position: Position;

  public titulo: string = 'Sin Titulo';
  public descripcion: string = 'Sin descripcion';

  constructor(  position: Position) {
    this.position = position
  }
}

export interface Position {
  lat: number;
  lng: number;
}