import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router, RouterEvent} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageApiSwitchService implements OnInit{
  language?: string;

  url_projects:string | undefined;
  url_perspectives:string | undefined;

  constructor(
    private router: Router, 
    private route: ActivatedRoute
  ) {

    // this.route.params.subscribe(params => {
    //   console.log("check language in service");
    //   this.language = params['language'];

      if( this.language === "de"){
        this.url_projects = "projekts";
        this.url_perspectives = "perspektives";
        console.log("####### project url: " + this.url_projects);
        console.log("lang: " + this.language);
      } else if (this.language === "en") {
        this.url_projects = "EN_projects";
        this.url_perspectives = "EN_perspectives";
        console.log("####### project url: " + this.url_projects);
        console.log("lang: " + this.language);
      } else {
        console.log("####### language seems to be " + this.language );
      }
    // });
  }


  ngOnInit() {
  }

  test(){
    console.log("language service: " + this.language);
  }

}