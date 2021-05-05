import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { CurrentLanguageService } from '../services_strapi/language/current-language.service';

import { BehaviorSubject,EMPTY, Observable, Subscription } from "rxjs";
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { ReducedPodcastsApi } from '../services_strapi/graphql/queries'

@Injectable({
  providedIn: 'root'
})
export class PodcastepisodesService {

  private allPodcastsCachedObservable: any;
  subscription: Subscription | undefined;
  languageAPIkeyword:any;


  private podcastSource = new BehaviorSubject('');
  public currentPodcastSource = this.podcastSource.asObservable();
  GQLqueryURL = environment.GQLqueryURL;
  language_prefix:string|undefined;

  getReducedPodcasts = async () => {
    const client = new ApolloClient({
      uri : environment.GQLqueryURL,
      cache : new InMemoryCache(),
    })
    let {data} = await client.query({ 
      query : ReducedPodcastsApi,
      variables: {
        language: this.language_prefix
        // language: "en"
      }
    });
    this.podcastSource.next(data.podcasts);
    return {
      props : {
        podcasts: data.podcasts
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
      //   this.languageAPIkeyword = "podcasts";
      // } else if (language === "en") {
      //   this.languageAPIkeyword = "en-podcasts";
      // } else {
      //   this.languageAPIkeyword = "en-podcasts";
      // }
    });
    this.getReducedPodcasts();
  }

  getAllPodcastEpisodes(): Observable<any> {
    if (this.allPodcastsCachedObservable) {
      return this.allPodcastsCachedObservable;
    }
    this.allPodcastsCachedObservable = this.http.get(`${environment.apiUrl}/${this.languageAPIkeyword}`).pipe(
      shareReplay(1),
      catchError((err:RTCError) => {
        delete this.allPodcastsCachedObservable;
        return EMPTY;
      }));
    return this.allPodcastsCachedObservable;
  }

  getPodcastEpisode(podcastId : any) {
    return this.http.get(`${environment.apiUrl}/${this.languageAPIkeyword}/${podcastId}`).pipe(map(res => res));
  }
}
