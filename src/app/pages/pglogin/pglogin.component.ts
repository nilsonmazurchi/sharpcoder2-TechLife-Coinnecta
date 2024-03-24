import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { checarCPF } from '../../validacoes/checarCPF';
import { FormService } from '../../servico/form.service';
import { LocalStorageService } from '../../servico/local-storage.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../servico/auth.service';
import {Credencial} from "../../modelos/Credencial";
interface IPairPasswordNums {
  firstNum: number;
  secondNum: number;
}


@Component({
  selector: 'app-pglogin',
  standalone: true,
  imports: [NgbCollapseModule, ReactiveFormsModule, CommonModule, RouterOutlet, RouterLink, FooterComponent],
  templateUrl: './pglogin.component.html',
  styleUrl: './pglogin.component.css'
})
export class PgloginComponent {

  creds: Credencial = {
    cpf: '',
    senha: ''
  }

  isCollapsed = true;

  constructor(
    // private fb: FormBuilder,
    // private localStorageService: LocalStorageService,
    private router: Router,
    private AuthService: AuthService,
    private formService: FormService,
    ) { }



  // form!: FormGroup;
  errorMessage: string | null = '';
  title = 'testeLogin';
  //A senha correta para o login
  correctPassword: any
  //Os numeros sortidos para mostrar nos botões (2 numeros por indice)
  pairPasswordNums: IPairPasswordNums[] = [];
  //A senha inserida pelo usuário ao clicar nos botões
  passwordInsert: IPairPasswordNums[] = [];
  //Uma mascara só para por no input enquanto passwordInsert vai sendo preenchido
  passwordMask: string = '';
  erroMessage: string = '';


  // @Output() formCompleted = new EventEmitter<void>();
  //
  // private formDataSubscription: Subscription = new Subscription();
  // public formData: any;

  // onSubmit() {
  //   if (this.form.valid) {
  //     const formValues: string = this.form.value;
  //    this.formService.setFormData(formValues)
  //     this.form.reset();
  //     this.formCompleted.emit();
  //   }
  // }

  ngOnInit(): void {
    console.log('ngOnInit chamado');
    // this.initLoginForm();
    // this.showAllUsuarios();
    this.generateButtons();

    // this.formDataSubscription = this.formService.getFormData().subscribe({
    //   next: (data: any) => {
    //     const cpfDoFormulario = data.cpf
    //     this.correctPassword = this.localStorageService.getSenha(cpfDoFormulario);
    //   },
    //   error: (error: any) => {
    //     console.error('Erro durante a execução do subscribe:', error);
    //   },
    //   complete: () => {
    //     console.log('Observable completado');
    //   }
    // });

  }



  // showAllUsuarios(): void {
  //   const allUsuarios = this.localStorageService.getAllUsuarios();
  //   console.log('Todos os usuários:', allUsuarios);
  // }

  // checkUserCPFExistsValidator(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const cpf = control.value;
  //     const cpfAsNumber = Number(cpf);
  //     if (!cpf) {
  //       return null;
  //   }
  //     const userDoesNotExist = cpf ? this.localStorageService.checarCPFUsuarioExiste(cpf) : false;
  //     if (userDoesNotExist) {
  //       return {cpfInvalid: 'DoesNotExist' };
  //     }
  //     return null;
  //   };
  // }

  loginForm = new FormGroup({
    cpf: new FormControl('', [
            Validators.required,
          ]),
    senha: new FormControl('', Validators.required)
  });

  //   private initLoginForm() {
  //   this.form = this.fb.group({
  //     cpf: new FormControl('', [
  //       Validators.required,
  //       Validators.minLength(11),
  //       Validators.maxLength(11),
  //       this.checkUserCPFExistsValidator(),
  //       checarCPF()
  //     ]),
  //     senha: new FormControl('', Validators.required)
  //   });
  // }

  login(){
    this.AuthService.login(this.loginForm.value as Credencial)
      .subscribe(response => {
        this.router.navigate(['historico'])
      }, () => {
        console.log("usuario invalido")// this.toast.error('Usuário e/ou senha inválidos');
      })
  }

   //recebe o valor do botao e adiciona em passwordInsert
   addToPassword(pair: IPairPasswordNums) {
    console.log('Pair:', pair);
    if (this.passwordInsert.length < 6) { // Verifica se já foram inseridos menos de 6 caracteres
      this.passwordInsert.push(pair);
      this.passwordMask += pair.firstNum;
    }
  }

  //funcionalidade do botao de apagar
  deletePassword() {
    console.log('Password Insert:', this.passwordInsert);
    if (this.passwordInsert.length > 0) {
      this.passwordInsert.pop();
      this.passwordMask = this.passwordMask.slice(0, -1);
    }
  }
  deleteEntirePassword() {
    this.passwordInsert = [];
    this.passwordMask = '';
  }


  //verifica se a senha está correta
  // isPasswordCorrect() {
  //   let isCorrect = true;
  //   let cpfDigitado = this.form.get('cpf')?.value;
  //   let cnpjDigitado = this.form.get('cnpj')?.value;
  //   let correctPassword = "";
  //   if(cpfDigitado){
  //     correctPassword = this.localStorageService.getSenha(cpfDigitado);
  //   } else if (cnpjDigitado){
  //     correctPassword = this.localStorageService.getSenhaCNPJ(cnpjDigitado);
  //   }
  //
  //   for (let i = 0; i < 6; i++) {
  //     const pair = this.passwordInsert[i];
  //     const passNumPos = parseInt(correctPassword[i]);
  //     if (pair && passNumPos !== undefined && (pair.firstNum !== passNumPos && pair.secondNum !== passNumPos)) {
  //       isCorrect = false;
  //       console.log("Não passei")
  //       break;
  //     }
  //   }
  //   if (isCorrect) {
  //         let usuarioLogado: { nome: string, cpf?: string, cnpj?:string}
  //         if(cpfDigitado){
  //           usuarioLogado = { nome: this.localStorageService.getNome(cpfDigitado), cpf: cpfDigitado }
  //         } else if(cnpjDigitado){
  //           usuarioLogado = { nome: this.localStorageService.getNome(cnpjDigitado), cnpj: cnpjDigitado }
  //         } else{
  //           throw new Error('CPF ou CNPJ não fornecido')
  //         }
  //         this.localStorageService.salvarUsuarioLogadoLocalStorage(usuarioLogado);
  //         console.log('Conteúdo do localStorage:', localStorage.getItem('usuariosLogado'));
  //         this.AuthService.login();
  //         this.router.navigateByUrl('/historico');
  //         this.formService.clearFormData();
  //     } else {
  //     this.erroMessage = 'Senha incorreta!';
  //     this.deleteEntirePassword();
  //   }
  // }


  //gera os botões com valores aleatórios sempre
  generateButtons() {
    const nums = this.randomizeNums();

    for (let i = 0; i < 5; i++) {
      const fisrtSortNum = nums.pop() as number;
      const secondSortNum = nums.pop() as number;
      this.pairPasswordNums[i] = {
        firstNum: fisrtSortNum,
        secondNum: secondSortNum,
      };
    }
  }

  //aleatoriza um array de numeros de 0 a 9, para facilitar a criação do pairPasswordNums
  private randomizeNums() {
    const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    return nums;
  }

}
