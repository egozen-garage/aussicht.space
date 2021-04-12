import { Component, OnInit } from '@angular/core';
import { LanguageApiSwitchService } from '../services_strapi/language/language-api-switch.service'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  language?:string;

  constructor(private selectLanguageAPI: LanguageApiSwitchService) { 
    this.language = this.selectLanguageAPI.language;

    // this.language = "de";
    // Auf welchem branch bist du gerade? Ich bin jetzt für länger am telefon aber kann mir das
    // später ansehen.
    // branch: ' language '
    // ich werdes noch mal pushen
  }

  public ngOnInit() {
  }

}
