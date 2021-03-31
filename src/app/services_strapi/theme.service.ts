import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { EMPTY, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private allThemesCachedObservable: any;

  constructor(private http: HttpClient) { }

  // getAllThemes() {
  //   return this.http.get(`${environment.apiUrl}/themes`).pipe(map(res => res));

  getAllThemes(): Observable<any> {
    if (this.allThemesCachedObservable) {
      return this.allThemesCachedObservable;
    }

    this.allThemesCachedObservable = this.http.get(`${environment.apiUrl}/themes`).pipe(
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
