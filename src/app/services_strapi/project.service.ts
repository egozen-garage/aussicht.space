import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { EMPTY, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private allProjectsCachedObservable: any;

  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<any> {
    if (this.allProjectsCachedObservable) {
      return this.allProjectsCachedObservable;
    }

    this.allProjectsCachedObservable = this.http.get(`${environment.apiUrl}/projekts`).pipe(
      shareReplay(1),
      catchError((err:RTCError) => {
        delete this.allProjectsCachedObservable;
        return EMPTY;
      }));
    return this.allProjectsCachedObservable;
  }

  getProject(projectId : any) {
    // return this.http.get(`${environment.apiUrl}/projects/${projectId}`).pipe(map(res => res));
    return this.http.get(`${environment.apiUrl}/projekts/${projectId}`).pipe(map(res => res));
  }

}
