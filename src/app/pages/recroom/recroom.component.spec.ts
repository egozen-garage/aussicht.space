import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecroomComponent } from './recroom.component';

describe('RecroomComponent', () => {
  let component: RecroomComponent;
  let fixture: ComponentFixture<RecroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
