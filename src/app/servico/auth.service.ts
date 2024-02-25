import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;

  login() {
    // Lógica de autenticação (por exemplo, verificar se o usuário está autenticado)
    this.isLoggedIn = true;
  }

  logout() {
    // Lógica de logout
    this.isLoggedIn = false;
  }

  isLoggedInUser(): boolean {
    return this.isLoggedIn;
  }
}