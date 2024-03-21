import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-historico-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './historico-nav.component.html',
  styleUrl: './historico-nav.component.css'
})
export class HistoricoNavComponent {

}
