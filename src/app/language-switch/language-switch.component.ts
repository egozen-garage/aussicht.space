import { Component, OnInit } from '@angular/core';

import { LanguageApiSwitchService } from '../services_strapi/language/language-api-switch.service'

import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss']
})
export class LanguageSwitchComponent implements OnInit {
  
  // language?: string;
  language = this.selectLanguageAPI.language;
  
  constructor(
    private selectLanguageAPI: LanguageApiSwitchService,
    private route: ActivatedRoute,
    private router: Router,
    ) { 
      this.route.params.subscribe(params => {
        this.language = params['language'];
        // this.selectLanguageAPI.test();
        if (this.language=== "de"){
          console.log("language is German");
        }else if (this.language === "en"){
          console.log("language is English");
        }else{
          console.log("no language");

          // add 
          // if other language (e.g. FR, ES..)
          // than use EN
        }
      });
    }
    
  ngOnInit(): void {
  }

  selectLanguage(){
    this.router.navigate([this.language]).then(() => {
      window.location.reload();
    });
  }

}
