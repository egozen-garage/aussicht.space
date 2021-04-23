import { Component, OnInit } from '@angular/core';
import { LanguageApiSwitchService } from '../services_strapi/language/language-api-switch.service'
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentLanguageService } from '../services_strapi/language/current-language.service';
import { Subscription } from 'rxjs';

import {Location} from '@angular/common';



@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss']
})
export class LanguageSwitchComponent implements OnInit {
  
  languages = ['de', 'en'];
  selectedLanguage = 'de';

  // language?: string;

  // language = this.selectLanguageAPI.language;
  // subscription: Subscription | undefined;
  // // language?: any;

  // constructor(
  //   private selectLanguageAPI: LanguageApiSwitchService,
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private currentLanguage: CurrentLanguageService,
  //   ) { 
  //     // this.selectLanguageAPI;

  //     this.route.params.subscribe(params => {
  //       this.language = params['language'];
  //       // if (this.language=== "de"){
  //       //   console.log("language is German");
  //       // }else if (this.language === "en"){
  //       //   console.log("language is English");
  //       // }else{
  //       //   console.log("no language");
  //       // }
  //     });

      
  //   }
    
  // ngOnInit(): void {
  //   this.subscription = this.currentLanguage.currentLanguage.subscribe((language: any) => {
  //     // , {relativeTo: this.route}
  //     console.log("compontent language: " + language);
  //     this.router.navigate([language]).then(() => {
  //       // window.location.reload();
  //     });
  //   });
  // }

  // selectLanguage(){
  //   this.currentLanguage.changeLanguage(this.language);
  // }









  constructor(
    private currentLanguage: CurrentLanguageService,
    private router: Router, 
    private location: Location) {
      let url = this.location.path();
      let extractedLanguage = url.slice(1, 3); // "/DE/two" -> "DE"
      if (extractedLanguage) {
        this.selectedLanguage = extractedLanguage;
        this.onLanguageSelectedOrChanged();
      }
  }

  ngOnInit(): void {
  }

  onLanguageSelectedOrChanged() {
    // Keep the route as is but change only the language
    let routeNew = this.location.path().slice(0, 1) + this.selectedLanguage + this.location.path().slice(3);
    this.currentLanguage.changeLanguage(this.selectedLanguage);
    this.router.navigate([routeNew]);
  }
}
