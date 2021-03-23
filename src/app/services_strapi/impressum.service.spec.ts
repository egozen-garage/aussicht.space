import { TestBed } from '@angular/core/testing';

import { ImpressumService } from './impressum.service';

describe('ImpressumService', () => {
  let service: ImpressumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpressumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
