import { Component, Input, OnInit } from '@angular/core';
import { PodcastepisodesService } from '../../../services_strapi/podcastepisodes.service';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from "../../../services/helper.service";
import { CurrentLanguageService } from '../../../services_strapi/language/current-language.service';

@Component({
  selector: 'app-back-to-hub',
  templateUrl: './back-to-hub.component.html',
  styleUrls: ['./back-to-hub.component.scss']
})
export class BackToHubComponent implements OnInit {
  @Input() unit_type:any;

  language:string | undefined ;

  constructor(
    private currentLanguage: CurrentLanguageService,
  ) {}

  ngOnInit(): void { 
    this.currentLanguage.currentLanguage.subscribe(res => {
      this.language = res;
    });
  }

}
