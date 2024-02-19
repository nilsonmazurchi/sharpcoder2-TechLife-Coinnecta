import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})

export class CadastroComponent {

  constructor(public formBuilder: FormBuilder, private router: Router) { }
  registerForm!: FormGroup;
  estados: string[] = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      sobrenome: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      nascimento: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]]
    });
  }


  get dadosForm() { return this.registerForm.controls; }

  registerUser() {
    if (this.registerForm.valid) {
      this.router.navigate(['/login']);
      alert('Cadastro realizado com sucesso!');
    } else {
      alert('Existem campos inválidos ou obrigatórios não preenchidos.');
    }
  }

  redirectHome() {
    this.router.navigateByUrl('/home');
  }
}
