import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouseCursorTrailComponent } from './mouse-cursor-trail.component';

describe('MouseCursorTrailComponent', () => {
  let component: MouseCursorTrailComponent;
  let fixture: ComponentFixture<MouseCursorTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MouseCursorTrailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MouseCursorTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
