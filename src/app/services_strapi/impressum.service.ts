import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { CurrentLanguageService } from '../services_strapi/language/current-language.service';

@Injectable({
  providedIn: 'root'
})
export class ImpressumService {

  language?:string;

  constructor(
    private http: HttpClient,
    private currentLanguage: CurrentLanguageService,
    ) { 
      this.currentLanguage.currentLanguage.subscribe(res => {
        this.language = res;        
      });
    }

  getAllOfImpressum() {
    if ( this.language === "de"){
      return this.http.get(`${environment.apiUrl}/impressum`).pipe(map(res => res));
    } else {
      return this.http.get(`${environment.apiUrl}/imprint-and-data-protection`).pipe(map(res => res));
    }
  }

}
