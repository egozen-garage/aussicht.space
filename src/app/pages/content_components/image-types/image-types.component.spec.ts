import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTypesComponent } from './image-types.component';

describe('ImageTypesComponent', () => {
  let component: ImageTypesComponent;
  let fixture: ComponentFixture<ImageTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
