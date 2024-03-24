import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Credencial } from "../modelos/Credencial";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private isLoggedIn: boolean = false;
  //
  // login() {
  //   // Lógica de autenticação (por exemplo, verificar se o usuário está autenticado)
  //   this.isLoggedIn = true;
  // }
  //
  // logout() {
  //   // Lógica de logout
  //   this.isLoggedIn = false;
  // }
  //
  // isLoggedInUser(): boolean {
  //   return this.isLoggedIn;
  // }

  private readonly apiUrl = 'http://localhost:5197';

  // constructor(
  //   private http: HttpClient,
  //   private router: Router
  // ){}
  //
  // login(creds: Credencial){
  //   return this.http.post<any>(`${this.API}`, creds, {
  //     observe: 'response',
  //   }).pipe(map((response: HttpResponse<any>) => {
  //     const body = response.body;
  //     const headers = response.headers;
  //
  //     const bearerToken = headers.get('Authorization')!;
  //     const token = bearerToken.replace('Bearer ', '');
  //
  //     localStorage.setItem('token', token);
  //
  //     return body;
  //   }));
  // }
  //
  // getToken(): string{
  //   return localStorage.getItem('token')!;
  // }
  //
  // deslogar() {
  //   localStorage.clear();
  //   this.router.navigate(['login']);
  // }

  private token: string | null = null;
  userId!: number;
  userCpf!: string;
  
  constructor(
    private http: HttpClient,
    private router: Router) { }

  login(credentials: any) {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        if (!(response && response.token)) {
          return;
        }
        this.token = response.token;
        this.userId = response.userId;
        this.userCpf = response.userCpf;
        if (typeof this.token === "string") {
          localStorage.setItem('token', this.token);
        }
      })
    );
  }

  checarCPFUsuarioExiste(cpf: string) {
    return this.http.get<boolean>(`${this.apiUrl}/usuarios/checar-cpf?cpf=${cpf}`);
  }


  logout() {
    this.token = null;
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }

}
