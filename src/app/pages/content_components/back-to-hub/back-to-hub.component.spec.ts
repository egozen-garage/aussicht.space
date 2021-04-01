import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackToHubComponent } from './back-to-hub.component';

describe('BackToHubComponent', () => {
  let component: BackToHubComponent;
  let fixture: ComponentFixture<BackToHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackToHubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackToHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
