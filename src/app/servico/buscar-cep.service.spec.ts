import { TestBed } from '@angular/core/testing';

import { BuscarCEPService } from './buscar-cep.service';

describe('BuscarCEPService', () => {
  let service: BuscarCEPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarCEPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
