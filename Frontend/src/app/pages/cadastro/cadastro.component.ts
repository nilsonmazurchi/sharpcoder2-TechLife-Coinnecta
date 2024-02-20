import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})

export class CadastroComponent {

  constructor(public formBuilder: FormBuilder, private router: Router) { }
  registerForm!: FormGroup;
  estados: string[] = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  cadastroObj: CadastroModel = new CadastroModel();

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      sobrenome: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]]
    });
  }


  get dadosForm() { return this.registerForm.controls; }

  registerUser() {
    if (this.registerForm.valid) {
      const localUser = localStorage.getItem('user');
      const users = localUser ? JSON.parse(localUser) : [];

      const isEmailUnique = users.every((user: CadastroModel) => user.email !== this.cadastroObj.email);

      if(isEmailUnique){
        users.push(this.cadastroObj);
        localStorage.setItem('user', JSON.stringify(users))
        console.log('Dados salvos no localStorage:', localStorage.getItem('user'));
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      }  else {
      alert('Já existe um email cadastrado! Tente um outro!');
    }
  }
  }

  redirectHome() {
    this.router.navigateByUrl('/home');
  }

  limparLocalStorage() {
    localStorage.removeItem('user');
    console.log('LocalStorage limpo.');
    alert('LocalStorage limpo com sucesso!');
  }
}

export class CadastroModel {
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  senha: string;

  constructor(){
    this.nome = "";
    this.sobrenome = "";
    this.cpf = "",
    this.email = "";
    this.senha = ""
  }
}
