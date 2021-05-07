import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineEssayComponent } from './machine-essay.component';

describe('MachineEssayComponent', () => {
  let component: MachineEssayComponent;
  let fixture: ComponentFixture<MachineEssayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineEssayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineEssayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
