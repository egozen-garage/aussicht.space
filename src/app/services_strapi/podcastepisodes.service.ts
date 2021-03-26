import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PodcastepisodesService {

  constructor(private http: HttpClient) { }
  getAllPodcastEpisodes() {
    return this.http.get(`${environment.apiUrl}/podcasts`).pipe(map(res => res));
  }

  getPodcastEpisode(podcastId : any) {
    return this.http.get(`${environment.apiUrl}/podcasts/${podcastId}`).pipe(map(res => res));
  }
}