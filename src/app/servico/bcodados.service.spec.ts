import { TestBed } from '@angular/core/testing';

import { BancoDeDadosService } from './bcodados.service';

describe('BcodadosService', () => {
  let service: BancoDeDadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BancoDeDadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
