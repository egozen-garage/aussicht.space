import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsDemoComponent } from './js-demo.component';

describe('JsDemoComponent', () => {
  let component: JsDemoComponent;
  let fixture: ComponentFixture<JsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
