import { TestBed } from '@angular/core/testing';

import { MitreService } from './mitre.service';

describe('MitreService', () => {
  let service: MitreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MitreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
