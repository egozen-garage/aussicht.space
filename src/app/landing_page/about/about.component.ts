import { Component, OnInit } from '@angular/core';
import { CurrentLanguageService } from '../../services_strapi/language/current-language.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  subscription: Subscription | undefined;
  language_prefix:string|undefined;
  
  constructor(
    private currentLanguage: CurrentLanguageService,
  ) { 
    this.subscription = this.currentLanguage.currentLanguage.subscribe((language: any) => {
      this.language_prefix = language;
    });
  }

  ngOnInit(): void {
  }

}
