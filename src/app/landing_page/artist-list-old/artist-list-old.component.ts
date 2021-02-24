import { Component, OnInit } from '@angular/core';

// Service
import { DynamicScriptLoaderService } from '../../services/dynamic-script-loader.service';

@Component({
  selector: 'app-artist-list-old',
  templateUrl: './artist-list-old.component.html',
  styleUrls: ['./artist-list-old.component.scss']
})
export class ArtistListOldComponent implements OnInit {
  artists = require("../../../assets/json/artist_list.json").sort();
  key = "name";

  public isMobileResolution: boolean;

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService) {
    if (window.innerWidth < 1024) {
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

  ngOnInit() {
    // Just call your load scripts function with scripts you want to load
    //this.loadScripts();    
  }
  
  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('random-num').then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }


}
