import { TestBed } from '@angular/core/testing';

import { SigmaConversionsService } from './sigma-conversions.service';

describe('SigmaConversionsService', () => {
  let service: SigmaConversionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SigmaConversionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
