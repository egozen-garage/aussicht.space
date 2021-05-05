import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CurrentLanguageService {

  constructor(
    private location: Location
    ) { }
  
  languageID = this.location.path().substring(1, 3); 
  private selectedLanguage = new BehaviorSubject(this.languageID);
  public currentLanguage = this.selectedLanguage.asObservable();

  changeLanguage(language: any) {
    this.selectedLanguage.next(language);
    // console.log("current language service triggered");
  }

}