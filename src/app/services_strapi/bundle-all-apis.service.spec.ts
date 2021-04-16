import { TestBed } from '@angular/core/testing';

import { BundleAllAPIsService } from './bundle-all-apis.service';

describe('BundleAllAPIsService', () => {
  let service: BundleAllAPIsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BundleAllAPIsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
