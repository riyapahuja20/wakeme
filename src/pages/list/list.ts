import { Component,NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { NavController, NavParams } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';
import { Marker } from './markerInterface';

@Component({
  selector: 'page-list',
   styles: [`
    .sebm-google-map-container {
       height: 300px;
     }
  `],
  templateUrl: 'list.html'
})

export class ListPage {
  // google maps zoom level
  zoom: number = 8;
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;
  
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
        console.log("full array",this.markers);

  }
  
  mapClicked($event: any) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng
    });
  }
  
  markers: Marker[] = [
	  {
		  lat: 51.673858,
		  lng: 7.815982,
		 
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		 
	  }
  ]
};
 

