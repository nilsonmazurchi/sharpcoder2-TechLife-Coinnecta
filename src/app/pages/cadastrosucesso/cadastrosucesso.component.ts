import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastrosucesso',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cadastrosucesso.component.html',
  styleUrl: './cadastrosucesso.component.css'
})
export class CadastrosucessoComponent {
titulo: string = 'Cadastro criado!';
texto: string = 'Faça login na sua conta e desfrute de todos os benefícios que o banco Coinnecta pode te fornecer!';
botaoTexto: string = 'Acesse sua conta';
}
