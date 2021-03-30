import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerspectiveService {

  // this.perspectivesCached;

  constructor(private http: HttpClient) {
    // this.perspectives = getAllPerspectives().subscribe();
   }

  getAllPerspectives() {
    return this.http.get(`${environment.apiUrl}/perspektives`).pipe(map(res => res));
    // return this.perspectives;
    // return this.http.get(`${environment.apiUrl}/perspectives`).pipe(map(res => res));
  }

  // remove this call
  getPerspective(perspectiveId : any) {
    return this.http.get(`${environment.apiUrl}/perspektives/${perspectiveId}`).pipe(map(res => res));
    // return this.http.get(`${environment.apiUrl}/perspectives/${perspectiveId}`).pipe(map(res => res));
  }
}
