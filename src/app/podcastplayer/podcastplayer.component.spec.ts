import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastplayerComponent } from './podcastplayer.component';

describe('PodcastplayerComponent', () => {
  let component: PodcastplayerComponent;
  let fixture: ComponentFixture<PodcastplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodcastplayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
