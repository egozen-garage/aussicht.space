import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { BehaviorSubject, EMPTY, Observable } from "rxjs";
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
// import { ReducedThemesApi } from '../services_strapi/graphql/queries';
import { ReducedThemesApi } from '../services_strapi/graphql/queries'

@Injectable({
  providedIn: 'root'
})

export class ThemeService {

  private allThemesCachedObservable: any;

  private themeSource = new BehaviorSubject('');
  public currentThemeSource = this.themeSource.asObservable();

  GQLqueryURL = environment.GQLqueryURL;
  private themes: any;

  getReducedThemes = async () => {
    const client = new ApolloClient({
      uri : environment.GQLqueryURL,
      cache : new InMemoryCache(),
    })
    let {data} = await client.query({ query : ReducedThemesApi });
    this.themeSource.next(data.themes);

    console.log("!!!!!!!! graph Q L function");
    return {
      props : {
        themes: data.themes
      }
    }
    
    
  }


  constructor(private http: HttpClient) { 
    console.log("-----------");
    this.getReducedThemes();
    console.log("-----------");
  }
  
  // getAllThemes() {
  //   return this.http.get(`${environment.apiUrl}/themes`).pipe(map(res => res));

  getAllThemes(): Observable<any> {
    if (this.allThemesCachedObservable) {
      return this.allThemesCachedObservable;
    }

    this.allThemesCachedObservable = this.http.get(`${environment.apiUrl}/themes`).pipe(
    // this.allThemesCachedObservable = this.getReducedThemes().pipe(
      shareReplay(1),
      catchError((err:RTCError) => {
        delete this.allThemesCachedObservable;
        return EMPTY;
      }));
    return this.allThemesCachedObservable;
  }

  getThemes(themeId : any) {
    return this.http.get(`${environment.apiUrl}/themes/${themeId}`).pipe(map(res => res));
  }

}
