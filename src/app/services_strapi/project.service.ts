import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { CurrentLanguageService } from '../services_strapi/language/current-language.service';

import { BehaviorSubject,EMPTY, Observable, Subscription } from "rxjs";
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { ReducedProjectsApi } from '../services_strapi/graphql/queries'


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private allProjectsCachedObservable: any;
  subscription: Subscription | undefined;
  languageAPIkeyword:any;



  private projectSource = new BehaviorSubject('');
  public currentProjectSource = this.projectSource.asObservable();
  GQLqueryURL = environment.GQLqueryURL;
  language_prefix:string|undefined;

  getReducedProjects = async () => {
    const client = new ApolloClient({
      uri : environment.GQLqueryURL,
      cache : new InMemoryCache(),
    })
    let {data} = await client.query({ 
      query : ReducedProjectsApi,
      variables: {
        language: this.language_prefix
        // language: "en"
      }
    });
    this.projectSource.next(data.projekts);
    return {
      props : {
        projects: data.projekts
      }
    }
  }

  constructor(
    private http: HttpClient,
    private currentLanguage: CurrentLanguageService,
    ) { 
      this.subscription = this.currentLanguage.currentLanguage.subscribe((language: string) => {
        this.language_prefix = language;
        if (this.language_prefix == "" ){
          this.language_prefix = "de";
        }        
        // if( language === "de"){
        //   this.language_prefix = "de";
        //   // this.languageAPIkeyword = "projekts";
        // } else if (language === "en") {
        //   this.language_prefix = "en";
        //   // this.languageAPIkeyword = "en-projects";
        // } else {
        //   this.language_prefix = "en";
        //   // this.languageAPIkeyword = "en-projects";
        // }
      });
      this.getReducedProjects();
  }

  // getAllProjects(): Observable<any> {
  //   if (this.allProjectsCachedObservable) {
  //     return this.allProjectsCachedObservable;
  //   }
  //   this.allProjectsCachedObservable = this.http.get(`${environment.apiUrl}/${this.languageAPIkeyword}`).pipe(
  //     shareReplay(1),
  //     catchError((err:RTCError) => {
  //       delete this.allProjectsCachedObservable;
  //       return EMPTY;
  //     }));
  //   return this.allProjectsCachedObservable;
  // }

  // getProject(projectId : any) {
  //   // return this.http.get(`${environment.apiUrl}/projects/${projectId}`).pipe(map(res => res));
  //   return this.http.get(`${environment.apiUrl}/${this.languageAPIkeyword}/${projectId}`).pipe(map(res => res));
  // }

}
