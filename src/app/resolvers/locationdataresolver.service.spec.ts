import { TestBed } from '@angular/core/testing';

import { LocationdataresolverService } from './locationdataresolver.service';

describe('LocationdataresolverService', () => {
  let service: LocationdataresolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationdataresolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
