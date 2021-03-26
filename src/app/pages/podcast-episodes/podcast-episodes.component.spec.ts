import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastEpisodesComponent } from './podcast-episodes.component';

describe('PodcastEpisodesComponent', () => {
  let component: PodcastEpisodesComponent;
  let fixture: ComponentFixture<PodcastEpisodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodcastEpisodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastEpisodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
