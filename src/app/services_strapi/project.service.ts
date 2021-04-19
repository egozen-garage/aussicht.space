import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { EMPTY, Observable, Subscription } from "rxjs";

import { CurrentLanguageService } from '../services_strapi/language/current-language.service';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private allProjectsCachedObservable: any;
  subscription: Subscription | undefined;

  projectAPIkeyword:any;

  constructor(
    private http: HttpClient,
    private currentLanguage: CurrentLanguageService,
    ) { 

    this.subscription = this.currentLanguage.currentLanguage.subscribe((language: any) => {
      // this.projectAPIkeyword = language;
      if( language === "de"){
        this.projectAPIkeyword = "projekts";      console.log("language is DEUTSCH");
      } else if (language === "en") {
        // this.projectAPIkeyword = "EN_projects";   console.log("language is ENglish");
        this.projectAPIkeyword = "projekts";      console.log("language is DEUTSCH");
      } else {
        this.projectAPIkeyword = "EN_projects";   console.log("language is not defined or something else");
      }
    });

  }

  getAllProjects(): Observable<any> {
    if (this.allProjectsCachedObservable) {
      return this.allProjectsCachedObservable;
    }
    this.allProjectsCachedObservable = this.http.get(`${environment.apiUrl}/${this.projectAPIkeyword}`).pipe(
      shareReplay(1),
      catchError((err:RTCError) => {
        delete this.allProjectsCachedObservable;
        return EMPTY;
      }));
    return this.allProjectsCachedObservable;
  }

  getProject(projectId : any) {
    // return this.http.get(`${environment.apiUrl}/projects/${projectId}`).pipe(map(res => res));
    return this.http.get(`${environment.apiUrl}/${this.projectAPIkeyword}/${projectId}`).pipe(map(res => res));
  }

}
