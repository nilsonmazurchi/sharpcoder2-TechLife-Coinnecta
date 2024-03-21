import { Component } from '@angular/core';
import { CadastroLoginSenhaComponent } from '../cadastroLoginSenha/cadastroLoginSenha'
import { CadastroEnderecoComponent } from '../cadastroEndereco/cadastroEndereco.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { CadastrosucessoComponent } from '../cadastrosucesso/cadastrosucesso.component';

@Component({
  selector: 'app-pgcadastro',
  standalone: true,
  imports: [ CadastroLoginSenhaComponent, CadastroEnderecoComponent, FooterComponent, CommonModule, CadastrosucessoComponent],
  templateUrl: './pgcadastro.component.html',
  styleUrl: './pgcadastro.component.css'
})
export class PgcadastroComponent {
  currentForm = 'register';
  switchToSubsequentForm() {
    this.currentForm = 'subsequent';
  }
  switchToSuccess(){
    this.currentForm = 'success';
  }
  switchToFirst(){
    this.currentForm = 'register';
  }
}
