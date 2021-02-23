import { Component, OnInit } from '@angular/core';

// Service
import { DynamicScriptLoaderService } from '../../services/dynamic-script-loader.service';

@Component({
  selector: 'app-artist-list-old',
  templateUrl: './artist-list-old.component.html',
  styleUrls: ['./artist-list-old.component.scss']
})
export class ArtistListOldComponent implements OnInit {

  constructor(private dynamicScriptLoader: DynamicScriptLoaderService) { }

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
