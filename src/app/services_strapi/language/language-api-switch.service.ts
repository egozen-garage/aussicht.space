import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router, RouterEvent} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { Subscription } from "rxjs";


import { CurrentLanguageService } from '../../services_strapi/language/current-language.service';


@Injectable({
  providedIn: 'root'
})
export class LanguageApiSwitchService implements OnInit{
  language?: any;

  url_projects:string | undefined;
  url_perspectives:string | undefined;
  
  subscription: Subscription | undefined;

  constructor(
    // private router: Router, 
    // private route: ActivatedRoute,
    // private currentLanguage: CurrentLanguageService,
    ) {
    
      // this.subscription = this.currentLanguage.currentLanguage.subscribe((language: any) => {
      //   console.log("api switch language: " + language);

      //   // if( language === "de"){
      //   //   this.url_projects = "projekts";
      //   //   this.url_perspectives = "perspektives";
      //   //   console.log("####### project url: " + this.url_projects);
      //   // } else if (language === "en") {
      //   //   this.url_projects = "EN_projects";
      //   //   this.url_perspectives = "EN_perspectives";
      //   //   console.log("####### project url: " + this.url_projects);
      //   // } else {
      //   //   console.log("####### language seems to be " + language );
      //   // }

      // });

  }

  ngOnInit() {
  }

}