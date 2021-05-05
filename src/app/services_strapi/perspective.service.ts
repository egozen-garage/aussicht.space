import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { CurrentLanguageService } from '../services_strapi/language/current-language.service';

import { BehaviorSubject,EMPTY, Observable, Subscription } from "rxjs";
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { ReducedPerspectivesApi } from '../services_strapi/graphql/queries'


@Injectable({
  providedIn: 'root'
})
export class PerspectiveService {

  private allPerspectivesCachedObservable: any;
  subscription: Subscription | undefined;
  languageAPIkeyword:any;

  private perspectiveSource = new BehaviorSubject('');
  public currentPerspectiveSource = this.perspectiveSource.asObservable();
  GQLqueryURL = environment.GQLqueryURL;
  language_prefix:string|undefined;

  getReducedPerspectives = async () => {
    const client = new ApolloClient({
      uri : environment.GQLqueryURL,
      cache : new InMemoryCache(),
    })
    let {data} = await client.query({ 
      query : ReducedPerspectivesApi,
      variables: {
        language: this.language_prefix
        // language: "en"
      }
    });
    this.perspectiveSource.next(data.perspektives);
    return {
      props : {
        perspectives: data.perspektives
      }
    }
  }

  constructor(
    private http: HttpClient,
    private currentLanguage: CurrentLanguageService,
    ) { 
    this.subscription = this.currentLanguage.currentLanguage.subscribe((language: any) => {
      this.language_prefix = language;
      // if( language === "de"){
      //   this.languageAPIkeyword = "perspektives";
      // } else if (language === "en") {
      //   this.languageAPIkeyword = "en-perspectives";
      // } else {
      //   this.languageAPIkeyword = "en-perspectives";
      // }
    });
    this.getReducedPerspectives();
  }

  getAllPerspectives(): Observable<any> {
    if (this.allPerspectivesCachedObservable) {
      return this.allPerspectivesCachedObservable;
    }
    this.allPerspectivesCachedObservable = this.http.get(`${environment.apiUrl}/${this.languageAPIkeyword}`).pipe(
      shareReplay(1),
      catchError((err:RTCError) => {
        delete this.allPerspectivesCachedObservable;
        return EMPTY;
      }));
    return this.allPerspectivesCachedObservable;
  }

  // remove this call
  getPerspective(perspectiveId : any) {
    return this.http.get(`${environment.apiUrl}/${this.languageAPIkeyword}/${perspectiveId}`).pipe(map(res => res));
    // return this.http.get(`${environment.apiUrl}/perspectives/${perspectiveId}`).pipe(map(res => res));
  }
}
