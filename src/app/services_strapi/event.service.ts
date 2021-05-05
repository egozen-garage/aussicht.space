import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { EMPTY, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private allEventsCachedObservable: any;

  constructor(private http: HttpClient,
  ) { }

  ngOnInit(): void {
  }

  getAllEvents(): Observable<any>  {
    if (this.allEventsCachedObservable) {
      return this.allEventsCachedObservable;
    }
    this.allEventsCachedObservable = this.http.get(`${environment.apiUrl}/events`).pipe(
      shareReplay(1),
      catchError((err:RTCError) => {
        delete this.allEventsCachedObservable;
        return EMPTY;
      })
    );         
    return this.allEventsCachedObservable;
  }

  getEvent(eventId : any) {
    return this.http.get(`${environment.apiUrl}/events/${eventId}`).pipe(map(res => res));
  }
}
