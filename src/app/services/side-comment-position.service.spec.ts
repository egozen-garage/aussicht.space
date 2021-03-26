import { TestBed } from '@angular/core/testing';

import { SideCommentPositionService } from './side-comment-position.service';

describe('SideCommentPositionService', () => {
  let service: SideCommentPositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SideCommentPositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
