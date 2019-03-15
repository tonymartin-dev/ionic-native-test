import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

//SDK de google
declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {
  
  /* Obtenemos el div creado en la vista */
  @ViewChild('Map') mapElement: ElementRef;

  /* Instanciamos las variables para el mapa */
  map: any;
  mapOptions: any;
  location = {lat: null, lng: null};
  markerOptions: any = {position: null, map: null, title: null};
  marker: any;
  apiKey: any = 'AIzaSyAwWIC7-xjISvYTBdQzTsOLVbJD56LiWvk';

  locale;

  constructor(public geolocation: Geolocation, public zone: NgZone) {

    /*Cargar el script de Google Maps dinámicamente */
    const script = document.createElement('script');
      script.id = 'googleMap';
      if (this.apiKey) {
          script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey;
      } else {
          script.src = 'https://maps.googleapis.com/maps/api/js?key=';
      }
      document.head.appendChild(script)
    this.locale = ()=>{
      this.geolocation.getCurrentPosition()
        .then((resp) => {
          this.location.lat = resp.coords.latitude
          this.location.lng = resp.coords.longitude;
          console.log(this.location)
        }).catch((error) => {
          console.log('Error getting location', error);
        });
    }
    this.watch = ()=>{ 
      this.geolocation.watchPosition()
        .subscribe((data) => {
          this.location.lat = data.coords.latitude
          this.location.lng = data.coords.longitude;
          console.log(this.location)
        });
    }
    this.watch()

    /* Opciones del mapa */
    this.mapOptions = {
      center: this.location,
      zoom: 21,
      mapTypeControl: false
    };
    
    //renderizar el mapa
    setTimeout(() => {
      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
      
      /*Opciones del marcador*/
      this.markerOptions.position = this.location;
      this.markerOptions.map = this.map;
      this.markerOptions.title = 'My Location';
      this.marker = new google.maps.Marker(this.markerOptions);
    }, 3000);

  }

  //Métodos para botonera
  /**
   * Método para obtener posición
   */
  locate(){
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log("lat" + resp.coords.latitude + "- long" + resp.coords.longitude)
    }).catch((error) => {
      console.log('Error al coger localizacion', error);
    });
  }

  /**
   * Método para obtener posición cada vez que el dispositivo se mueve
   */
  watch(){
    this.geolocation.watchPosition().subscribe((data) => {
      // data puede ser un set de coordenadas o, en caso de que ocurra, un error.
      console.log("lat" + data.coords.latitude + "- long" + data.coords.longitude)
    });
  }

}

/*import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx'

declare var google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {

  @ViewChild('Map') mapElement: ElementRef;

  map: any;
  mapOptions: any;
  location = {lat:null, lng: null};
  markerOptions: any = {position: null, map: null, title: null}
  marker: any;
  apiKey: any = 'AIzaSyAwWIC7-xjISvYTBdQzTsOLVbJD56LiWvk';

  watch: Function;
  locale: Function;

  constructor(
    private geolocation: Geolocation, public zone: NgZone
  ) {

    const script = document.createElement('script');
    script.id = 'googleMap;'
    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey;

    this.locale = ()=>{
      this.geolocation.getCurrentPosition()
        .then((resp) => {
          this.location.lat = resp.coords.latitude
          this.location.lng = resp.coords.longitude;
          console.log(this.location)
        }).catch((error) => {
          console.log('Error getting location', error);
        });
    }
    this.watch = ()=>{ 
      this.geolocation.watchPosition()
        .subscribe((data) => {
          this.location.lat = data.coords.latitude
          this.location.lng = data.coords.longitude;
          console.log(this.location)
        });
    }
    this.watch()

    this.mapOptions = {
      center: this.location,
      zoom: 21,
      mapTypeControl: false
    }

    //renderizar el mapa
    setTimeout(() => {
      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
      
      this.markerOptions.position = this.location;
      this.markerOptions.map = this.map;
      this.markerOptions.title = 'My Location';
      this.marker = new google.maps.Marker(this.markerOptions);
    }, 3000);

  }




  ngOnInit() {

    


  }

}*/

