import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDesignJavascriptComponent } from './custom-design-javascript.component';

describe('CustomDesignJavascriptComponent', () => {
  let component: CustomDesignJavascriptComponent;
  let fixture: ComponentFixture<CustomDesignJavascriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomDesignJavascriptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDesignJavascriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
