import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentTrackService {

  private fileAndIndexSource = new BehaviorSubject('');
  public currentFileAndIndex = this.fileAndIndexSource.asObservable();

  constructor() { }

  changeTrack(fileAndIndex: string) {
    this.fileAndIndexSource.next(fileAndIndex);
  }
}
