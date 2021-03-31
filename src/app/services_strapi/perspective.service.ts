import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { EMPTY, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PerspectiveService {

  private allPerspectivesCachedObservable: any;

  constructor(private http: HttpClient) { }

  getAllPerspectives(): Observable<any> {
    if (this.allPerspectivesCachedObservable) {
      return this.allPerspectivesCachedObservable;
    }

    this.allPerspectivesCachedObservable = this.http.get(`${environment.apiUrl}/perspektives`).pipe(
      shareReplay(1),
      catchError((err:RTCError) => {
        delete this.allPerspectivesCachedObservable;
        return EMPTY;
      }));
    return this.allPerspectivesCachedObservable;
  }

  // remove this call
  getPerspective(perspectiveId : any) {
    return this.http.get(`${environment.apiUrl}/perspektives/${perspectiveId}`).pipe(map(res => res));
    // return this.http.get(`${environment.apiUrl}/perspectives/${perspectiveId}`).pipe(map(res => res));
  }
}
