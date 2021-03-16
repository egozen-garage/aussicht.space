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
export class ArtistListComponent implements OnInit {
  // load json file with the artist list
  artists = require("../../../assets/json/artist_list.json");
  //artists = this.artists_unsort.sort(new Intl.Collator('de').compare(a.name, b.name));
  // artists = this.artists_unsort.sort(function (a:any, b:any){
  //   return a.localeCompare(b);
  // });
  
  // key of object within the json file
  key = "name";
  image_size:number | undefined;
  image_size_STYLE:number | undefined;

  //public isMobileResolution: boolean;

  constructor(
    //public devicesService: DevicesService,
  ) { 
    if (window.innerWidth >= 1024) {
      //this.isMobileResolution = true;
      this.image_size = 64;
      this.image_size_STYLE = 64;
    } else if(window.innerWidth > 576 && window.innerWidth < 1024) {
      //this.isMobileResolution = false;
      this.image_size = 32;
      this.image_size_STYLE = 32;
    }else if(window.innerWidth <= 576){
      this.image_size = 32;
      this.image_size_STYLE = 16;
    }
    this.sortByKey(this.artists, this.key);
  }
 
  // transform(value: any, ...args: any[]) {
  // }

  // public getIsMobileResolution(): boolean {
  //   return this.isMobileResolution;
  // }

  sortByKey(artists:any, key:any) {
    return artists.sort(function(a: { [x: string]: any; }, b: { [x: string]: any; }) {
        var x = a[key]; 
        var y = b[key];
        return x.localeCompare(y);
        //return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  resize_window(event:any){
    let window_size = event.target.innerWidth;
    // console.log("window resize: " + window_size);
    if (window_size >= 1024){
      this.image_size = 64;
      this.image_size_STYLE = 64;
    } else if(window_size > 576 && window_size < 1024) {
      this.image_size = 32;
      this.image_size_STYLE = 32;
    } else if(window_size <= 576){
      this.image_size = 32;
      this.image_size_STYLE = 16;
    }
  }

  
  //loading_speed = 100;
  //deloading_speed = 90;
  randomNumber:number = 0;
  maximum = 39;
  minimum = 0;
  load_gpt_images(artist_name:string, artist_forename:string, folder_name:string, i_counter:number){
    //let cancelled = false;
    // calculate the amount of images needed to cover the whole name
    const amount_of_images = Math.round( (artist_name.length + artist_forename.length) / 2);
    // build the directory folder path
    const ImageDirectory = ("/assets/imgs/image_gpt/" + folder_name + "/generated/" + this.image_size + "/" + this.image_size + "_" + folder_name + "_");

    //create array of image paths
    let ImagePath_array = [];
    for (let i = 0; i < amount_of_images; i++){
      let randomnumber = Math.floor(Math.random() * (this.maximum - this.minimum + 1)) + this.minimum;
      let ImagePath = ImageDirectory + randomnumber + ".png";
      ImagePath_array.push(ImagePath);
    }

    // call array of image paths and add an image for each object
    ImagePath_array.forEach(function (file) {
      // 1. Select the div element using the id property
      const image_gpt_container = document.getElementById(folder_name + i_counter);
      // 2. Create a new <img> element programmatically
      const img_tag = document.createElement("img");
      // 3. Add the path to src 
      img_tag.src = file;
      img_tag.setAttribute("style", "display:none;");
      img_tag.setAttribute("onerror", "this.onerror=null; this.src='/assets/imgs/image_gpt/image_processing.gif'");
      // 4. Append the img element to the div element
      image_gpt_container?.insertBefore(img_tag, image_gpt_container.childNodes[0]);
      //image_gpt_container?.appendChild(img_tag);
    });

    // set visibitity to visibile with delay
    var counter = 1;
    const loading_speed = 100;
    const time_until_start = 400;
    const image_gpt_container = Array.from(document.getElementById(folder_name + i_counter)!.getElementsByTagName('img'));
    const hover_image_gpt_container = document.getElementById(folder_name + i_counter);
    let hover:boolean = false;
    image_gpt_container.reverse().forEach( (file) => {
      setTimeout( () => {
        // add: check if mouse hover container --> if yes: add image --> if no: abort
        file.setAttribute('style', 'display:inline-block; padding-right: 10px; height:' + this.image_size_STYLE + 'px; width: auto;')
        //hover_image_gpt_container?.onmouseover = function(event){ let hover = true};
        // hover_image_gpt_container?.addEventListener('mouseover', () =>{ 
        //   if (hover == false){
        //     hover = true;
        //   } else {
        //     hover = false;
        //   }
        // });
        // if (hover) { 
        //   file.setAttribute('style', 'display:inline-block; padding-right: 10px') 
        // } else { return; }

      }, time_until_start + (counter * loading_speed)); 

      counter = counter +1;
    });
  }




  artist_list_enter(artist_name:string, artist_forename:string, folder_name:string, i_counter:number){
    //console.log("mouse enter");

    this.load_gpt_images(artist_name, artist_forename, folder_name, i_counter);
  }




  artist_list_leave(artist_name:string, artist_forename:string, folder_name:string, i_counter:number){
    //console.log("mouse leave");    
    const image_gpt_container = Array.from(document.getElementById(folder_name + i_counter)!.getElementsByTagName('img'));
    var counter = 1;
    const deloading_speed = 90;
    image_gpt_container.forEach(function (file:any) {
      setTimeout(function () {
        file.remove();
      }, counter * deloading_speed);
      counter = counter +1;
    });
  }


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
  


