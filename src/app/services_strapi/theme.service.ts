import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http: HttpClient) { }

  getAllThemes() {
    return this.http.get(`${environment.apiUrl}/themes`).pipe(map(res => res));
  }

  getThemes(themeId : any) {
    return this.http.get(`${environment.apiUrl}/themes/${themeId}`).pipe(map(res => res));
  }

}
