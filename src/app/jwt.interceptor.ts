import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "./servico/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthService
  ) {}

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   const token = this.authenticationService.getToken();
  //
  //   if(token && !request.url.startsWith('https://viacep.com.br/ws/')){
  //     request = request.clone({
  //       setHeaders: {
  //         Authorization: `Bearer ${token}`,
  //         token: `${token}`
  //       }
  //     });
  //   }
  //   return next.handle(request);
  // }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authenticationService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }


}
