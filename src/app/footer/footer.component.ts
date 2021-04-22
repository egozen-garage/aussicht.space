import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageApiSwitchService } from '../services_strapi/language/language-api-switch.service'
import { CurrentLanguageService } from '../services_strapi/language/current-language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  language?:string;
  // subscription: Subscription | undefined;

  constructor(
    private selectLanguageAPI: LanguageApiSwitchService,
    private currentLanguage: CurrentLanguageService,
    ) { 

    // this.language = "de";
    // Auf welchem branch bist du gerade? Ich bin jetzt für länger am telefon aber kann mir das
    // später ansehen.
    // branch: ' language '
    // ich werdes noch mal pushen
  }

  public ngOnInit() {
    this.currentLanguage.currentLanguage.subscribe(res => {
      this.language = res;
    });
    // this.subscription = this.currentLanguage.currentLanguage.subscribe((language: any) => {
    //   this.language = language;
    // });
  }

}
