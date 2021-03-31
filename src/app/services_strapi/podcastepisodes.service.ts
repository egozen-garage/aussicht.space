import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { EMPTY, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PodcastepisodesService {

  private allPodcastsCachedObservable: any;

  constructor(private http: HttpClient) { }

  getAllPodcastEpisodes(): Observable<any> {
    if (this.allPodcastsCachedObservable) {
      return this.allPodcastsCachedObservable;
    }

    this.allPodcastsCachedObservable = this.http.get(`${environment.apiUrl}/podcasts`).pipe(
      shareReplay(1),
      catchError((err:RTCError) => {
        delete this.allPodcastsCachedObservable;
        return EMPTY;
      }));
    return this.allPodcastsCachedObservable;
  }

  getPodcastEpisode(podcastId : any) {
    return this.http.get(`${environment.apiUrl}/podcasts/${podcastId}`).pipe(map(res => res));
  }
}
