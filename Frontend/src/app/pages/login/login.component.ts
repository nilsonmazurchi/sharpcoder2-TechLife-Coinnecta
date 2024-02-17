import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(public formBuilder: FormBuilder, private router: Router) { }
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }


  get dadosForm() { return this.loginForm.controls; }

  loginUser() {
    if(this.loginForm.value.email === "admin@coinnecta.com" 
    && this.loginForm.value.senha === "admin"){
      this.router.navigate(['/home']);
    }else alert('Usuário ou senha inválidos');
  }
}
