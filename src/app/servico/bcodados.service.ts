import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


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
    console.log('Verificando se o usuário existe para o email:', email);
    return this.http.get<boolean>(`${this.baseUrl}/usuarios/checar-email?email=${email}`)
        .pipe(
            tap(existe => console.log('Usuário existe:', existe))
        );
}


  checarCNPJUsuarioExiste(cnpj: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/usuarios/checar-cnpj?cnpj=${cnpj}`);
  }

  checarCPFUsuarioExiste(cpf: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/usuarios/checar-cpf?cpf=${cpf}`);
  }
}
