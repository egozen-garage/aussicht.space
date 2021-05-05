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

  constructor(
    private currentLanguage: CurrentLanguageService,
    private router: Router, 
    private location: Location) {
      let url = this.location.path();
      let extractedLanguage = url.slice(1, 3); // "/DE/two" -> "DE"
      if (extractedLanguage) {
        this.selectedLanguage = extractedLanguage;
        this.languageWhileBrowsingAdjustment();
      }
  }

  ngOnInit(): void {
  }
  languageWhileBrowsingAdjustment() {
    // Keep the route as it is but change only the language
    let routeNew = this.location.path().slice(0, 1) + this.selectedLanguage + this.location.path().slice(3);    
    this.currentLanguage.changeLanguage(this.selectedLanguage);
    this.router.navigate([routeNew]);
  }

  onLanguageSelectedOrChanged() {
    // Keep the route as it is but change only the language
    // + refresh the browser

    // "index" + unit_type + title
    let routeNew = this.location.path().slice(0, 1) + this.selectedLanguage + this.location.path().slice(3);    
    this.currentLanguage.changeLanguage(this.selectedLanguage);
    this.router.navigate([routeNew]).then(() => {
      window.location.reload();      
    });
  }


}
