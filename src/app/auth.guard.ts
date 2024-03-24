import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "./servico/auth.service";
import {inject} from "@angular/core";
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//
//   constructor(private authService: AuthService, private router: Router) {}
//
//   canActivate(): boolean {
//     if (this.authService.isLoggedInUser()) {
//       return true;
//     } else {
//       this.router.navigate(['/login']); // Redireciona para a página de login se o usuário não estiver autenticado
//       return false;
//     }
//   }
// }

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getToken()){
    return true;
  }

  router.navigate(['login']);
  return false;

}
