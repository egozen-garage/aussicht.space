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
  LogoTitleMarschner_stiftung:string|undefined;
  LogoTitleHessen:string|undefined;
  LogoTitleHfG:string|undefined;
  LogoTitleForm:string|undefined;
  LogoTitleFlemings:string|undefined;
  ImpressumLinkName:string|undefined;

  constructor(
    private selectLanguageAPI: LanguageApiSwitchService,
    private currentLanguage: CurrentLanguageService,
    ) { 
      this.currentLanguage.currentLanguage.subscribe(res => {
        this.language = res;        
      });
      console.log("footer language", this.language);
      if( this.language === "de"){
        this.LogoTitleMarschner_stiftung = "Gefördert durch:";
        this.LogoTitleHessen = "Unterstützt von:";
        this.LogoTitleHfG = "In Zusammenarbeit mit:";
        this.LogoTitleForm = "Medienpartner:";
        this.LogoTitleFlemings = "Hotelpartner:";
        this.ImpressumLinkName = "Impressum und Datenschutz";
      } else {
      // } else if (this.language === "en") {
        this.LogoTitleMarschner_stiftung = "funded by";
        this.LogoTitleHessen = "supported by";
        this.LogoTitleHfG = "in cooperation with";
        this.LogoTitleForm = "media partner";
        this.LogoTitleFlemings = "hotel partner";
        this.ImpressumLinkName = "Imprint and data protection";
      }
  }

  public ngOnInit() {
   
    // this.subscription = this.currentLanguage.currentLanguage.subscribe((language: any) => {
    //   this.language = language;
    // });
  }

}
