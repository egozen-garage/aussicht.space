import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDesignIframeComponent } from './custom-design-iframe.component';

describe('CustomDesignIframeComponent', () => {
  let component: CustomDesignIframeComponent;
  let fixture: ComponentFixture<CustomDesignIframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomDesignIframeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDesignIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
