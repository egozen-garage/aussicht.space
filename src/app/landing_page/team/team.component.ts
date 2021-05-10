import { Component, OnInit } from '@angular/core';
import { CurrentLanguageService } from '../../services_strapi/language/current-language.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  tmembers = require("../../../assets/json/team-members_list.json").sort();
  key = "name";

  subscription: Subscription | undefined;
  language_prefix:string|undefined;
  
  constructor(
    private currentLanguage: CurrentLanguageService,
  ) {
    this.sortByKey(this.tmembers, this.key)
    this.subscription = this.currentLanguage.currentLanguage.subscribe((language: any) => {
      this.language_prefix = language;
    });
  }

  sortByKey(tmembers:any, key:any) {
    return tmembers.sort(function(a: { [x: string]: any; }, b: { [x: string]: any; }) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  ngOnInit(): void {
  }


}
