import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './servico/auth.service'; 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedInUser()) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redireciona para a página de login se o usuário não estiver autenticado
      return false;
    }
  }
}