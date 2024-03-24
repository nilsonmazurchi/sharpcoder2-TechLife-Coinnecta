import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { throwError, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BancoDeDadosService {
  private baseUrl = 'http://localhost:5197'; // Substitua pela URL do seu backend

  constructor(private http: HttpClient) { }

  // Métodos para acessar os endpoints do backend

  getNome(cpf: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/usuarios/nome?cpf=${cpf}`);
  }

  getSenha(cpf: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/usuarios/senha?cpf=${cpf}`);
  }

  getSenhaCNPJ(cnpj: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/usuarios/senha-cnpj?cnpj=${cnpj}`);
  }

  getNomeCNPJ(cnpj: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/usuarios/nome-cnpj?cnpj=${cnpj}`);
  }

  checarEmailUsuarioExiste(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/usuarios/checar-email?email=${email}`);
  }

  checarCNPJUsuarioExiste(cnpj: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/usuarios/checar-cnpj?cnpj=${cnpj}`);
  }

  checarCPFUsuarioExiste(cpf: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/usuarios/checar-cpf?cpf=${cpf}`);
  }

  //Endereco
  cadastroDeEndereco(endereco: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/enderecos`, endereco);
  }

  //Conta
  criarContaCorrente(usuarioId: number, dadosConta: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/contas/${usuarioId}`, dadosConta);
  }
  getSaldo(contaId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/contas/${contaId}`)
  }

  //Transacao
  depositar(valor: number) {
    return this.http.post<any>(`${this.baseUrl}/transacoes/deposito`, valor);
  }
  sacar(valor: number) {
    return this.http.post<any>(`${this.baseUrl}/transacoes/saque`, valor);
  }
  tranferir(valor: number) {
    return this.http.post<any>(`${this.baseUrl}/transacoes/transferecia`, valor);
  }
}
