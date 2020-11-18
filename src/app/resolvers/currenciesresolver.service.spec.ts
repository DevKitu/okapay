import { TestBed } from '@angular/core/testing';

import { CurrenciesresolverService } from './currenciesresolver.service';

describe('CurrenciesresolverService', () => {
  let service: CurrenciesresolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrenciesresolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
