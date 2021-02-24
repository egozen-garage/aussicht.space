import { OnChanges, SimpleChanges } from '@angular/core';
import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
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
export class ArtistListComponent implements OnInit, OnChanges, PipeTransform {
  artists = require("../../../assets/json/artist_list.json").sort();
  key = "name";

  tempHoverArtist: Array<any>  = [];

  public isMobileResolution: boolean;

  constructor(
    //public devicesService: DevicesService,
  ) { 
    if (window.innerWidth < 1024) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
    this.sortByKey(this.artists, this.key);
    //this.addImagesToArtist()
  }
 
  transform(value: any, ...args: any[]) {

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

  parent_id = "#parent_artist_names_";
  child_id = "#child_artist_list_images_spans_";
  
  loading_speed = 100;
  deloading_speed = 90;
  randomNumber:number = 0;

  pass_image_files:string | undefined;
  currentArtistHover:string | undefined;

  fullName:any = "";
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentArtistHover) {
      this.fullName = this.calculateFullName();
    }
  }
  calculateFullName(){
    console.log("the name has changed");
    
  }
  artist_list_enter(folder_name:string){
    this.currentArtistHover = folder_name;
    this.tempHoverArtist.push(folder_name);
    console.log("mouse enter");
    
    
    //this.randomNumber = Math.floor(Math.random() * 40);
    //this.pass_image_files = '<img class="artist_list_images_imgs" src="../../assets/imgs/image_gpt/' + folder_name + '/generated/64x64/64_' + folder_name + '_' + this.randomNumber + '.png" style="display: none">'
  }

  artist_list_leave(folder_name:string){
    this.tempHoverArtist = [];    
    this.currentArtistHover = "";
    console.log("mouse leave");
    this.pass_image_files = "";
    
  }
  addimages(folder_name:string){
    //this.randomNumber = Math.floor(Math.random() * 40);
    //this.pass_image_files = '<img class="artist_list_images_imgs" src="/assets/imgs/image_gpt/' + folder_name + '/generated/64x64/64_' + folder_name + '_' + this.randomNumber + '.png" style="display: none">';
    
    //this.pass_image_files = "<div>" + folder_name + "</div>";
    if (this.tempHoverArtist[0] == folder_name){
      console.log("equal");
      // console.log("if hover artist than show: "+ folder_name);
      // console.log("show me your temp: " + this.tempHoverArtist[0]);
    }
  }

  addImagesToArtist(folder_name:string){
    // (<HTMLInputElement>document.getElementById(folder_name)).innerHTML = folder_name;
    // console.log(folder_name);
    // console.log("is it running?");
  }
  // <img id="arndt_armin_thumbnail0" class="artist_list_images_imgs" src="../../assets/imgs/image_gpt/arndt_armin/generated/64x64/64_arndt_armin_7.png" style="display: none">


  ngOnInit(): void {
  }

 
}

  //   if (window.screen.width > 479) {
      // function hover_arist_name(id_parent, id_child){
      //     var loading_speed = 100;
      //     var deloading_speed = 90;
      //     var kids_reverseds = [].reverse.call($(id_child).children());
      //     var kids = $(id_child).children();
  
      //     var isHovered = $(id_parent).is(':hover');
      //     if (isHovered == true) {
      //         //console.log('load');
      //         startLoadingImages();
      //     } else {
      //         //console.log('delete');
      //         stopLoadingImages();
      //     }
  
      //     function stopLoadingImages(){
      //         // var kits = kids.reverse();
      //         // console.log(kits);
      //         $.each(kids, function (i, kid) {
      //             setTimeout(function () {
      //                 $(kid).css('display', 'none');
      //             }, i * deloading_speed);
      //         })
      //     }
  
      //     function startLoadingImages(){
      //         $.each(kids_reverseds, function (i, kids_reversed) {
      //             setTimeout(function () {
      //                 var isHovered = $(id_parent).is(':hover'); // returns true or false
      //                 if (isHovered == true) {
      //                     //console.log('display i:' + i );
      //                     $(kids_reversed).css('display', 'inline-block');
      //                 } else {
      //                     //stopLoadingImages();
      //                     //console.log('stop loading:' + i );
      //                 }
      //             }, i * loading_speed);
      //         })
      //     }
      // }
  // }
  


