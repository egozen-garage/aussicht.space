import { Component, OnInit } from '@angular/core';
//import { DevicesService } from '../../services/devices.service';
// import { Platform } from '@angular/cdk/platform';
// import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit {
  artists = require("../../../assets/json/artist_list.json").sort();
  key = "name";

  public isMobileResolution: boolean;

  constructor(
    //public devicesService: DevicesService,
  ) { 
    if (window.innerWidth < 768) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
    this.sortByKey(this.artists, this.key);    
  }

  public getIsMobileResolution(): boolean {
    return this.isMobileResolution;
  }

  sortByKey(artists:any, key:any) {
    return artists.sort(function(a: { [x: string]: any; }, b: { [x: string]: any; }) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  ngOnInit(): void {
    

  //   if (window.screen.width > 479) {
  //     function hover_arist_name(id_parent, id_child){
  //         var loading_speed = 100;
  //         var deloading_speed = 90;
  //         var kids_reverseds = [].reverse.call($(id_child).children());
  //         var kids = $(id_child).children();
  
  //         var isHovered = $(id_parent).is(':hover');
  //         if (isHovered == true) {
  //             //console.log('load');
  //             startLoadingImages();
  //         } else {
  //             //console.log('delete');
  //             stopLoadingImages();
  //         }
  
  //         function stopLoadingImages(){
  //             // var kits = kids.reverse();
  //             // console.log(kits);
  //             $.each(kids, function (i, kid) {
  //                 setTimeout(function () {
  //                     $(kid).css('display', 'none');
  //                 }, i * deloading_speed);
  //             })
  //         }
  
  //         function startLoadingImages(){
  //             $.each(kids_reverseds, function (i, kids_reversed) {
  //                 setTimeout(function () {
  //                     var isHovered = $(id_parent).is(':hover'); // returns true or false
  //                     if (isHovered == true) {
  //                         //console.log('display i:' + i );
  //                         $(kids_reversed).css('display', 'inline-block');
  //                     } else {
  //                         //stopLoadingImages();
  //                         //console.log('stop loading:' + i );
  //                     }
  //                 }, i * loading_speed);
  //             })
  //         }
  //     }
  // }
  }

}
