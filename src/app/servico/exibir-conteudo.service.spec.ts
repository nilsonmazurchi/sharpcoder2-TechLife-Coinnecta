import { TestBed } from '@angular/core/testing';

import { ExibirConteudoService } from './exibir-conteudo.service';

describe('ExibirConteudoService', () => {
  let service: ExibirConteudoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExibirConteudoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
