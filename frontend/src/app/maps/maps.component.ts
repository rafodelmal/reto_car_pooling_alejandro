import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})




export class MapsComponent implements OnInit {

   

  tieneGeo: any;

  latitudInicial: any;
  longitudInicial: any;
  incrementar: any = 0;

  marcador: any[];
  zoom: number = 10;

  dirFinal: any;
  dirInicio: any;

  marcadortotal: any

//  mapOptions: any[];

  marcadores: any [] = [];

  positions: any[] = [];
  
  originPlaceId: string;
  originInput: any;

  destinationPlaceId: string;
  destinationInput: any;

  travelMode: google.maps.TravelMode;
  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;

  map: google.maps.Map;
  modeSelector:any;

  constructor() { 

  }

  

  ngOnInit() { 

    //esto iria en el html en el ngui-map [options]="mapOptions"
    //aca se manda las opciones al ngui-map this.mapOptions = [latitud1, longitud1, zoom]

    navigator.geolocation.getCurrentPosition((posicion) => {

      var latitud1  = posicion.coords.latitude;
      var longitud1 = posicion.coords.longitude;
      var zoom = 13

      console.log(latitud1)
      console.log(longitud1)

     this.latitudInicial = latitud1
     this.longitudInicial = longitud1

     


     const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        mapTypeControl: false,
        center: { lat: latitud1, lng: longitud1 },
        zoom: 14,
      }
    );

    });


  }


  onMapReady(map) {






    console.log('map', map);
    console.log('markers', map.markers); 

    
    this.originPlaceId = ''
    this.destinationPlaceId = "";
    this.travelMode = google.maps.TravelMode.DRIVING;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(map);

    this.originInput = document.getElementById(
      "origen"
    ) as HTMLInputElement;
    this.destinationInput = document.getElementById(
      "destino"
    ) as HTMLInputElement;

    this.modeSelector = document.getElementById(
      "calcular"
    ) as HTMLSelectElement;


    const originAutocomplete = new google.maps.places.Autocomplete(this.originInput);
    originAutocomplete.setFields(["place_id"]);

    const destinationAutocomplete = new google.maps.places.Autocomplete(this.destinationInput);
    destinationAutocomplete.setFields(["place_id"]);


    this.setupClickListener(
      "changemode-driving",
      google.maps.TravelMode.DRIVING
    );

    this.setupPlaceChangedListener(originAutocomplete, "ORIG", map);
    this.setupPlaceChangedListener(destinationAutocomplete, "DEST", map);

    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.originInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.destinationInput
    );
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.modeSelector);



  }

 

  setupClickListener(id: string, mode: google.maps.TravelMode) {
    const radioButton = document.getElementById(id) as HTMLInputElement;

    radioButton.addEventListener("click", () => {
      
      this.travelMode = mode;
      this.route();
    });
  }


  geocodePlaceId(
    geocoder: google.maps.Geocoder,
    map: google.maps.Map,
    infowindow: google.maps.InfoWindow
  ) {
    const placeId = this.originPlaceId

    geocoder.geocode({ placeId: placeId }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          map.setZoom(11);
          map.setCenter(results[0].geometry.location);
          const marker = new google.maps.Marker({
            map,
            position: results[0].geometry.location,
          });
          infowindow.setContent(results[0].formatted_address);
          infowindow.open(map, marker);
        } else {
          window.alert("No results found");
        }
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
    });
  }


  route() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      return;
    }
    const me = this;

    this.directionsService.route(

      {
        origin: { placeId: this.originPlaceId },
        destination: { placeId: this.destinationPlaceId },
        travelMode: this.travelMode,
       
      },
      (response, status) => {
        if (status === "OK") {
          me.directionsRenderer.setDirections(response);

          this.dirFinal = response.routes[0].legs[0].end_address;
          this.dirInicio = response.routes[0].legs[0].start_address

          console.log("Destino: ", this.dirFinal)
          console.log("Final: ", this.dirInicio)

        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );


  }

  setupPlaceChangedListener(

    autocomplete: google.maps.places.Autocomplete,
    mode: string,
    map: google.maps.Map
  ) {

    autocomplete.bindTo("bounds", map);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.place_id) {
        window.alert("Please select an option from the dropdown list.");
        return;
      }

      if (mode === "ORIG") {

        this.originPlaceId = place.place_id;

        console.log(this.originPlaceId)
       
      }else {
        this.destinationPlaceId = place.place_id;

        console.log(this.destinationPlaceId)

      }

    });
  }

  onIdle(event) {
    //console.log('map ubicacion', event.target);

    //console.log(event.geometry.location.lat());
  }


  onMarkerInit(marker) {
    
    console.log('marker que pongo', marker);
    

    let marcadorLat = marker.getPosition().lat()
    let marcadorLong = marker.getPosition().lng()

    console.log("latitud marcador ruta", marcadorLat)
    console.log("longitud marcador ruta", marcadorLong)

    this.marcadores.push({marcadorLat,marcadorLong})

  }



  onMapClick(event) {
    this.positions.push(event.latLng);
    event.target.panTo(event.latLng);

  }
  

}


