import { TestBed } from '@angular/core/testing';

import { UserlocationresolverService } from './userlocationresolver.service';

describe('UserlocationresolverService', () => {
  let service: UserlocationresolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserlocationresolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
