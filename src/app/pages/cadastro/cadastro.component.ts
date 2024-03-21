import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../components/footer/footer.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
    selector: 'app-cadastro',
    standalone: true,
    templateUrl: './cadastro.component.html',
    styleUrl: './cadastro.component.css',
    imports: [ReactiveFormsModule, HttpClientModule, CommonModule, FormsModule, FooterComponent, NavbarComponent]
})

export class CadastroComponent {

  constructor(public formBuilder: FormBuilder, private router: Router) { }
  registerForm!: FormGroup;
  estados: string[] = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  cadastroObj: CadastroModel = new CadastroModel();

  ngAfterViewInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registerForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      sobrenome: ['', [Validators.required]],
      tipoPessoa: ['', [Validators.required]],
      cpf: ['', []], // CPF não é obrigatório se o tipo de pessoa for Jurídica
      cnpj: ['', []], // CNPJ não é obrigatório se o tipo de pessoa for Física
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
    });

    this.registerForm.get('tipoPessoa')?.valueChanges.subscribe(value => {
      const cpfControl = this.registerForm.get('cpf');
      const cnpjControl = this.registerForm.get('cnpj');

      if (value === 'Fisica' && cpfControl) {
        cpfControl.setValidators([Validators.required, Validators.pattern(/^[0-9]{11}$/)]);
        cnpjControl?.clearValidators();
      } else if (value === 'Juridica' && cnpjControl) {
        cnpjControl.setValidators([Validators.required, Validators.pattern(/^[0-9]{14}$/)]);
        cpfControl?.clearValidators();
      }

      cpfControl?.updateValueAndValidity();
      cnpjControl?.updateValueAndValidity();
    });
  }


  get dadosForm() { return this.registerForm.controls; }

  registerUser() {
    if (this.registerForm.valid) {
      const localUser = localStorage.getItem('user');
      const users = localUser ? JSON.parse(localUser) : [];
  
      const isEmailUnique = users.every((user: CadastroModel) => user.email !== this.cadastroObj.email);
  
      if (isEmailUnique) {
        this.cadastroObj.tipoPessoa = this.registerForm.value.tipoPessoa;
        if (this.cadastroObj.tipoPessoa === 'Fisica') {
          this.cadastroObj.cpf = this.registerForm.value.cpf;
        } else if (this.cadastroObj.tipoPessoa === 'Juridica') {
          this.cadastroObj.cnpj = this.registerForm.value.cnpj;
        }
  
        users.push(this.cadastroObj);
        localStorage.setItem('user', JSON.stringify(users));
        console.log('Dados salvos no localStorage:', localStorage.getItem('user'));
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      } else {
        alert('Já existe um email cadastrado! Tente outro!');
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
  tipoPessoa: string;
  cpf: string;
  cnpj:string;
  email: string;
  senha: string;

  constructor(){
    this.nome = "";
    this.sobrenome = "";
    this.tipoPessoa = "";
    this.cpf = "";
    this.cnpj = "";
    this.email = "";
    this.senha = ""
  }
}
