import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImpressumService {
  constructor(private http: HttpClient) { }

  getAllOfImpressum() {
    return this.http.get(`${environment.apiUrl}/impressum`).pipe(map(res => res));
  }
}
