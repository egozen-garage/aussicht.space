import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDesignBlankHTMLComponent } from './custom-design-blank-html.component';

describe('CustomDesignBlankHTMLComponent', () => {
  let component: CustomDesignBlankHTMLComponent;
  let fixture: ComponentFixture<CustomDesignBlankHTMLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomDesignBlankHTMLComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDesignBlankHTMLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
