import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerspectiveService {

  constructor(private http: HttpClient) { }

  getAllPerspectives() {
    return this.http.get(`${environment.apiUrl}/perspectives`).pipe(map(res => res));
  }

  getPerspective(perspectiveId : any) {
    return this.http.get(`${environment.apiUrl}/perspectives/${perspectiveId}`).pipe(map(res => res));
  }}
