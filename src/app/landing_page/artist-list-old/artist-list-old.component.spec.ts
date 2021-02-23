import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistListOldComponent } from './artist-list-old.component';

describe('ArtistListOldComponent', () => {
  let component: ArtistListOldComponent;
  let fixture: ComponentFixture<ArtistListOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistListOldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistListOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
