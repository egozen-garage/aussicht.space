import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextTypesComponent } from './text-types.component';

describe('TextTypesComponent', () => {
  let component: TextTypesComponent;
  let fixture: ComponentFixture<TextTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
