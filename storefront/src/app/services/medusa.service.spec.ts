import { TestBed } from '@angular/core/testing';

import { MedusaService } from './medusa.service';

describe('MedusaService', () => {
  let service: MedusaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedusaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
