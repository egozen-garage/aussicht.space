import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private http: HttpClient) { }

  getAllEvents() {
    // console.log("event api: " + environment.apiUrl + "/events/");
    
    return this.http.get(`${environment.apiUrl}/events`).pipe(map(res => res));
  }

  getEvent(eventId : any) {
    return this.http.get(`${environment.apiUrl}/events/${eventId}`).pipe(map(res => res));
  }
}
