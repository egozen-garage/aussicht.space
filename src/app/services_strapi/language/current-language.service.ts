import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentLanguageService {

  private selectedLanguage = new BehaviorSubject('de');
  public currentLanguage = this.selectedLanguage.asObservable();

  constructor() { }

  changeLanguage(language: any) {
    this.selectedLanguage.next(language);
    // console.log("current language service triggered");
    
  }

}