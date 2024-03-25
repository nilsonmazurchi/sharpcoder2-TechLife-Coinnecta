import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../servico/auth.service";

@Component({
  selector: 'app-historico-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './historico-nav.component.html',
  styleUrl: './historico-nav.component.css'
})
export class HistoricoNavComponent {

  constructor(
    private AuthService: AuthService,
  ){}

  deslogar(){
    this.AuthService.logout();
    localStorage.clear();
  }

}
