import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { LocalNotifications } from '@ionic-native/local-notifications';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	@ViewChild('map') mapElement: ElementRef;
  	map: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation,public geocoder: NativeGeocoder, public toaster: ToastController, public localNotifications: LocalNotifications) {

  }

  ionViewDidLoad(){
    this.loadMap();
  }

  addMarker(){
 
  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
  });
 
  // this.getAlarm();
  // let content = "<h4>Information!</h4>";          
 
  // this.addInfoWindow(marker, content);
 
}


public getAlarm() {
        this.localNotifications.schedule({
            title: "Test Title",
            text: "Delayed Notification",
            sound: 'file://jingle-bells-sms.mp3',
            at: new Date(new Date().getTime() + 10000) 
        });
    }
 
  loadMap(){
 
    //let latLng = new google.maps.LatLng(-34.9290, 138.6010);

    this.geolocation.getCurrentPosition().then((position) => {
 
 	console.log(position);
 	
    let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
 
    let mapOptions = {
      enableHighAccuracy: true,
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    //this.getcountry(position);
 
  }, (err) =>{
  	console.log(err);
  });

    let watch = this.geolocation.watchPosition();
		watch.subscribe((position) => {
  			console.log(position.coords.longitude + ' ' + position.coords.latitude);
		// data can be a set of coordinates, or an error (if an error occurred).
		// data.coords.latitude
		// data.coords.longitude

		
		});

}
getcountry(pos){
	this.geocoder.reverseGeocode(pos.coords.latitude, pos.coords.longitude).then((res: NativeGeocoderReverseResult) => {
      let country = this.toaster.create({
        message: res.countryName,
        duration: 4000
      });
      country.present();
    })
}
}