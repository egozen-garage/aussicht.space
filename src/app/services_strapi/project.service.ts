import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getAllProjects() {
    // return this.http.get(`${environment.apiUrl}/projects`).pipe(map(res => res));
    return this.http.get(`${environment.apiUrl}/projekts`).pipe(map(res => res));
  }

  getProject(projectId : any) {
    // return this.http.get(`${environment.apiUrl}/projects/${projectId}`).pipe(map(res => res));
    return this.http.get(`${environment.apiUrl}/projekts/${projectId}`).pipe(map(res => res));
  }

}
