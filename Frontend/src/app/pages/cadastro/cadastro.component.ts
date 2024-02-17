import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
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

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
      
    });
  }


  get dadosForm() { return this.registerForm.controls; }

  registerUser() {
    if(this.registerForm.value.email === "admin@coinnecta.com" 
    && this.registerForm.value.senha === "admin"){
      this.router.navigate(['/home']);
    }else alert('Usuário já cadastrado');
  }

 
}
