import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CadastroModel } from '../cadastro/cadastro.component';

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
  
  loginObj: LoginModel  = new LoginModel();

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }


  get dadosForm() { return this.loginForm.controls; }

  loginUser() {
    const localUser = localStorage.getItem('user');
    if(localUser != null) {
      const users =  JSON.parse(localUser);

      const isUserPresent =  users.find( (user:CadastroModel)=> user.email == this.loginObj.email && user.senha == this.loginObj.senha);
      if(isUserPresent != undefined) {
        alert('Login realizado com sucesso!');
        this.router.navigateByUrl('/home');
      } else {
        alert('Usuário ou senha inválidos')
      }
    }
  //   if (this.loginForm.value.email === "admin@coinnecta.com"
  //     && this.loginForm.value.senha === "admin") {
  //     this.router.navigate(['/home']);
  //     alert('Login realizado com sucesso!');
  //   } else alert('Usuário ou senha inválidos');
 }

  goToRegister() {
    this.router.navigate(['/cadastro']);
  }

  redirectHome() {
    this.router.navigateByUrl('/home');
  }
  }

export class LoginModel  { 
  email: string;
  senha: string;

  constructor() {
    this.email = ""; 
    this.senha= ""
  }
}

