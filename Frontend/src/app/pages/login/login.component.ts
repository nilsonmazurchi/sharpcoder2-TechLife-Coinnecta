import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CadastroModel } from '../cadastro/cadastro.component';
import { DadosService } from '../../servico/dados.service';
import { AuthService } from '../../servico/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private DadosService: DadosService,
    private AuthService: AuthService
  ) { }
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
        this.DadosService.setNome(isUserPresent.nome);
        this.DadosService.setSobrenome(isUserPresent.sobrenome);
        this.AuthService.login();
        this.router.navigateByUrl('/historico');
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
    this.router.navigate(['/home']);
  }
  }

export class LoginModel  { 
  email: string;
  senha: string;
  nome: string;
  sobrenome: string

  constructor() {
    this.email = ""; 
    this.senha = "";
    this.nome = "";
    this.sobrenome = ""
  }
}

