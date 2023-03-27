import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Marcador, Position } from '../../classes/marcador.class';

import {MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';
 
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit{

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  
  marcadores: Marcador[] = [];

  titulo: string = "";
  descripcion: string = "";
  posInfo: number = 0;
  marcador!: Marcador;
  
  posicion: Position = {
    lat: -17.383424,
    lng: -66.1651456
  }

  options: google.maps.MapOptions = {
    center: {lat: this.posicion.lat, lng: this.posicion.lng},
    zoom: 12,
  };
  
  markerOptions: google.maps.MarkerOptions = {draggable: false};

  constructor( private snackBar: MatSnackBar, public dialog: MatDialog ) {

    if( localStorage.getItem('marcadores') ) {
      this.marcadores = JSON.parse(localStorage.getItem('marcadores')! );
    }

  }

  ngOnInit(): void {

  }

  addMarker(event: google.maps.MapMouseEvent) {

    this.posicion = event.latLng!.toJSON();
    const marcador = new Marcador( this.posicion );
    this.marcadores.push(marcador);

    console.log(this.marcadores);

    this.guardarStorage();

    this.snackBar.open('Marcador agregado', 'Cerrar', { duration: 3000 });

  }

  borrarMarcador(index: number) {

    console.log(index);
    this.marcadores.splice(index, 1);
    this.guardarStorage();

    this.snackBar.open('Marcador borrado', 'Cerrar', { duration: 3000 });
  }

  editarMarcador(marcador: Marcador) {

    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: { titulo: marcador.titulo, descripcion: marcador.descripcion},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      if( !result ) { return; }

      marcador.titulo, this.titulo = result.titulo;
      marcador.descripcion, this.descripcion = result.descripcion;


      this.guardarStorage();
      this.snackBar.open('Marcador actualizado', 'Cerrar', { duration: 3000 });
    });

  }

  openInfoWindow(marker: MapMarker, content: Marcador, index: number) {
    this.marcador = content;
    this.titulo = content.titulo;
    this.descripcion = content.descripcion;
    this.posInfo = index

    this.infoWindow.open(marker);
  }

  guardarStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores))
  }


}
