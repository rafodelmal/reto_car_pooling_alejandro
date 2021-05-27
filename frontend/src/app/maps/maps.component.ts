import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})




export class MapsComponent implements OnInit {

   @ViewChild('mapaP') mapaP: ElementRef;

  tieneGeo: any;

  latitudInicial: any;
  longitudInicial: any;
  incrementar: any = 0;

  marcador: any[];
  zoom: number = 10;


  marcadortotal: any

  mapOptions: any[];

  marcadores: any [] = [];

  positions: any[] = [];
  


  constructor() { }

  ngOnInit() { 


    navigator.geolocation.getCurrentPosition((posicion) => {

      var latitud1  = posicion.coords.latitude;
      var longitud1 = posicion.coords.longitude;
      var zoom = 13

      console.log(latitud1)
      console.log(longitud1)

     this.latitudInicial = latitud1
     this.longitudInicial = longitud1

      this.mapOptions = [latitud1, longitud1, zoom]


    });


  }



  findme(){

    if (navigator.geolocation)
    {
      this.tieneGeo = 1
    }
    else
    {
      this.tieneGeo = 0
    }  


  }

  onMapReady(map) {
    console.log('map', map);
    console.log('markers', map.markers);  // to get all markers as an array 
  }

  onIdle(event) {
    console.log('map ubicacion', event.target);
  }


  onMarkerInit(marker) {
    
    console.log('marker que pongo', marker);
    

    let marcadorLat = marker.getPosition().lat()
    let marcadorLong = marker.getPosition().lng()

    console.log("latitud marcador ruta", marcadorLat)
    console.log("longitud marcador ruta", marcadorLong)

    this.marcadores.push({marcadorLat,marcadorLong})

    console.log("Arreglo de marcadores", this.marcadores)


    if (this.marcadores.length == 1){

      marker = false

      alert('ya tiene 2 marcadores')


    }

  }



  onMapClick(event) {
    this.positions.push(event.latLng);
    event.target.panTo(event.latLng);

  }
  

}


