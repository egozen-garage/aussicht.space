import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitHubComponent } from './unit-hub.component';

describe('UnitHubComponent', () => {
  let component: UnitHubComponent;
  let fixture: ComponentFixture<UnitHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitHubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
