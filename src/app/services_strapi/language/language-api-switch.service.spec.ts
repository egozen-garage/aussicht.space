import { TestBed } from '@angular/core/testing';

import { LanguageApiSwitchService } from './language-api-switch.service';

describe('LanguageApiSwitchService', () => {
  let service: LanguageApiSwitchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageApiSwitchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
