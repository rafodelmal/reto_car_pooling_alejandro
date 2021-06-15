 import { User } from 'app/login/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'app/shared/services/login.service';
import { ActualizarDireccionService } from '../shared/services/actualizar-direccion.service';
import Swal from 'sweetalert2';
import { NguiMapModule} from '@ngui/map';



@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.css']
})


export class DireccionesComponent implements OnInit {

  lunes: any;
  martes: any;
  miercoles: any;
  jueves: any;
  viernes: any;
  sabado: any;
  domingo: any;

  cupos: any

  flexRadioDefault: any;


  dirOrigen: any;
  dirDestino: any;
  horaSalidaOrigen: any;
  horaSalidaDestino: any;
  placa: any;
  total: any;
  diasServicio: any;
  tienePlaca: any = 1;
  emaillogin: any;

  resultadoBusqueda: any;


  // variables de los mapas 

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


  constructor(private service: ActualizarDireccionService, private router: Router, private datosLogin: LoginService) { }


  ngOnInit() {

    let recuperarStorage = JSON.parse( localStorage.getItem("datosSesion"));

   let emailLogin, claveLogin

    emailLogin = this.datosLogin.email
    claveLogin = this.datosLogin.clave
    this.emaillogin = recuperarStorage.email

    let respuesta;

    var user: User;

    this.datosLogin.getlogin(emailLogin, claveLogin).subscribe(data => {
      respuesta = data;

      let recuperarStorage = JSON.parse( localStorage.getItem("datosSesion"));

      console.log(user)

      this.dirOrigen = recuperarStorage.dirOrigen;
      this.dirDestino = recuperarStorage.dirDestino;
      this.horaSalidaDestino = recuperarStorage.horaSalidaDestino;

      this.horaSalidaOrigen = recuperarStorage.horaSalidaOrigen;
      this.diasServicio = recuperarStorage.diasServicio;
      this.total = recuperarStorage.total;

    
      

      if (recuperarStorage.carpooler === 1) {

        this.placa = recuperarStorage.placaCarro;
        this.diasServicio = recuperarStorage.diasServicio;
        this.total = recuperarStorage.total;
        this.cupos = recuperarStorage.cupos;

      } else {

        this.tienePlaca = 0;
        this.placa = ' ';
        this.total = ' ';
        this.diasServicio = ' ';
        this.cupos = ' ';

      }

      if (recuperarStorage.carpooler === 0) {

      let placaDesa = document.getElementById('placa') as HTMLInputElement
      placaDesa .disabled = true
      let cuposDesa = document.getElementById('cupos') as HTMLInputElement
      cuposDesa .disabled = true
      let diasServicioDesa = document.getElementById('diasServicio') as HTMLInputElement
      diasServicioDesa.disabled = true
      let totalDesa = document.getElementById('total') as HTMLInputElement
      totalDesa.disabled = true

      }


    })

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

  noCarpooling(){

    let placaDesa = document.getElementById('placa') as HTMLInputElement
    placaDesa .disabled = true
    let cuposDesa = document.getElementById('cupos') as HTMLInputElement
    cuposDesa .disabled = true
    let diasServicioDesa = document.getElementById('diasServicio') as HTMLInputElement
    diasServicioDesa.disabled = true
    let totalDesa = document.getElementById('total') as HTMLInputElement
    totalDesa.disabled = true

  }

  siCarpooling(){

    let placaDesa = document.getElementById('placa') as HTMLInputElement
    placaDesa.disabled = false
    let cuposDesa = document.getElementById('cupos') as HTMLInputElement
    cuposDesa.disabled = false
    let diasServicioDesa = document.getElementById('diasServicio') as HTMLInputElement
    diasServicioDesa.disabled = false
    let totalDesa = document.getElementById('total') as HTMLInputElement
    totalDesa.disabled = false

  }

  guardarDias(){

    let lunes, martes, miercoles, jueves, viernes, sabado, domingo;

    if (this.lunes == true){
      lunes = "lunes-"
    }else{
      lunes = ""
    }

    if (this.martes == true){
      martes = "martes-"
    }else{
      martes = ""
    }

    if (this.miercoles == true){
      miercoles = "miercoles-"
    }else{
      miercoles = ""
    }

    if (this.jueves == true){
      jueves = "jueves-"
    }else{
      jueves = ""
    }

    if (this.viernes == true){
      viernes = "viernes-"
    }else{
      viernes = ""
    }

    if (this.sabado == true){
      sabado = "sabado-"
    }else{
      sabado = ""
    }

    if (this.domingo == true){
      domingo = "domingo"
    }else{
      domingo = ""
    }

    let totalDias = lunes+martes+miercoles+jueves+viernes+sabado+domingo

    this.diasServicio = totalDias

  }

  guardarDirecciones(){

    this.dirOrigen = this.dirInicio
    this.dirDestino = this.dirFinal


  }

  actualizarDireccion(from, align) {


    let dirOrigen1 = this.dirOrigen;
    let dirDestino1 = this.dirDestino;
    let horaSalidaDestino1 = this.horaSalidaDestino;
    let horaSalidaOrigen1 = this.horaSalidaOrigen;
    let cupos;
    let placa1;
    let tienePlaca1 = this.tienePlaca;
    let total;
    let diasServicio;

    let respuesta;

         // condicional para enviar la placa a la Bd si es o no carpooler
         if (this.tienePlaca === 0) {
          placa1 = 'sin registro';
          diasServicio = '';
          total = '0';
          cupos = '0';
        } else {
          placa1 = this.placa;
          diasServicio = this.diasServicio;
          total = this.total;
          cupos = this.cupos;
        }

       

      
        this.service.postDireccion(dirOrigen1, dirDestino1, horaSalidaDestino1, horaSalidaOrigen1, placa1, cupos, tienePlaca1, this.emaillogin, total, diasServicio).subscribe(data=> {
          respuesta=data;

          let recuperarStorage = JSON.parse( localStorage.getItem("datosSesion"));

          console.log("respuesta en component", respuesta);

          if (data===0){

            Swal.fire({
              position: 'top',
              icon: 'error',
              title: '¡No fue posuble actualiar tus datos!',
              text: 'por favor verifica todos los campos.',
              showConfirmButton: false,
              timer: 1700
            })

          }else{

            Swal.fire({
              position: 'top',
              icon: 'success',
              title: 'Datos actualizados con exito.',
              showConfirmButton: false,
              timer: 1300
            })

            if(tienePlaca1===1){
              this.router.navigate(['/reservas'])
            }else{
              this.router.navigate(['/carpool'])
            }
            
          }
            console.log(dirOrigen1 + ' ' + dirDestino1 + ' ' + horaSalidaDestino1 + ' ' + horaSalidaOrigen1 + ' ' + placa1 + ' ' + tienePlaca1 + ' ' + this.emaillogin)

            recuperarStorage.dirOrigen = this.dirOrigen;
            recuperarStorage.dirDestino = this.dirDestino;
            recuperarStorage.horaSalidaOrigen = this.horaSalidaOrigen;
            recuperarStorage.horaSalidaDestino = this.horaSalidaDestino;
            recuperarStorage.carpooler = this.tienePlaca;
            recuperarStorage.placaCarro = this.placa;
            recuperarStorage.cupos = this.cupos;
            recuperarStorage.diasServicio = this.diasServicio;

            
            localStorage.setItem("datosSesion", JSON.stringify(recuperarStorage));


        })
      }


      /// metodos de mapas


      
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
