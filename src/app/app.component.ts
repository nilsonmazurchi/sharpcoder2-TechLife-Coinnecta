import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./pages/login/login.component";
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { RouterOutlet } from '@angular/router';
import {RouterLink} from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtInterceptor} from "./jwt.interceptor";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, LoginComponent, ReactiveFormsModule, CadastroComponent, RouterLink],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
})
export class AppComponent {
  title = 'sharpcoder2-TechLife-Coinnecta';
}
