import { TestBed } from '@angular/core/testing';

import { PodcastepisodesService } from './podcastepisodes.service';

describe('PodcastepisodesService', () => {
  let service: PodcastepisodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PodcastepisodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
