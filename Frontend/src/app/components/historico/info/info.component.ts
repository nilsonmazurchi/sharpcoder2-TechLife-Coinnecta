import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  exibirConteudo: boolean = false;

  botaoConteudo() {
    this.exibirConteudo = !this.exibirConteudo;
  }
}
