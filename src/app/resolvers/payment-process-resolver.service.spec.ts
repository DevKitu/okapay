import { TestBed } from '@angular/core/testing';

import { PaymentProcessResolverService } from './payment-process-resolver.service';

describe('PaymentProcessResolverService', () => {
  let service: PaymentProcessResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentProcessResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
