import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usuarioCadastrado } from '../modelos/usuarioCadastrado';
import { BancoDeDadosService } from './bcodados.service';

@Injectable({
  providedIn: 'root'
})
export class ExibirConteudoService {
  exibirConteudo: boolean = false;
  
  constructor(protected readonly httpClient: HttpClient, private bancoDeDadosService: BancoDeDadosService) { }

  // postCriarContaCorrente(usuarioId: any, payload: any): Observable<HttpResponse<any>> {
  //   const body = payload;
  //   const params = new HttpParams(body);
  //   const headers = new HttpHeaders();
  //   return this.httpClient.post<any>('http://localhost:5197/contas/' + usuarioId + '', body, { headers, params });
  // }

  criarContaCorrente(usuarioId: number, dadosConta: any): Observable<any> {
    return this.bancoDeDadosService.criarContaCorrente(usuarioId, dadosConta);
  }
  getSaldo(contaId: number): Observable<any> {
    return this.bancoDeDadosService.getSaldo(contaId);
  }

}
