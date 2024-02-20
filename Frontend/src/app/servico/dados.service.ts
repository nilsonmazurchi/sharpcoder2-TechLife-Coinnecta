import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadosService {
  private nomeSource = new BehaviorSubject<string>('');
  private sobrenomeSource = new BehaviorSubject<string>('');

  nome$ = this.nomeSource.asObservable();
  sobrenome$ = this.sobrenomeSource.asObservable();

  setNome(nome: string) {
    this.nomeSource.next(nome);
  }

  setSobrenome(sobrenome: string) {
    this.sobrenomeSource.next(sobrenome);
  }
}
