import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService, IUsuarioLogado } from '../../../servico/local-storage.service';


@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent implements OnInit{
  user!: IUsuarioLogado;
  exibirConteudo: boolean = false;
  botaoConteudo() {
    this.exibirConteudo = !this.exibirConteudo;
  }

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    const usuarioString = localStorage.getItem('usuariosLogado');
    console.log(usuarioString);

    // Use o valor padrão se 'usuarioString' for null
    this.user = usuarioString ? JSON.parse(usuarioString) : { nome: '' };
    
    console.log(this.user);
  }
}
