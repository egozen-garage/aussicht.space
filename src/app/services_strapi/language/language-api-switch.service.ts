import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageApiSwitchService {

  constructor(private http: HttpClient) {
    console.log("choose language starts");

    this.getJSON().subscribe(data => {
      console.log("language switch service: " + data.DE);
    });
    console.log("choose language function is called");
    
  }

  public getJSON(): Observable<any> {
    return this.http.get("./api.env.json");
  }

  choose_language(){

  }

}
