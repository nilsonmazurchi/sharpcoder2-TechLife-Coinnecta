import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DadosService } from '../../../servico/dados.service';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent implements OnInit{
  exibirConteudo: boolean = false;
  botaoConteudo() {
    this.exibirConteudo = !this.exibirConteudo;
  }

  nome: string = '';
  sobrenome: string = '';

  constructor(private DadosService: DadosService) { }

  ngOnInit(): void {
    this.DadosService.nome$.subscribe(nome => this.nome = nome);
    this.DadosService.sobrenome$.subscribe(sobrenome => this.sobrenome = sobrenome);
  }
}
