import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalStorageService } from '../../servico/local-storage.service';
import { FormService } from '../../servico/form.service';
import { Subscription } from 'rxjs';
import { checarNome } from '../../validacoes/chegarNome';
import { checarTelefone } from '../../validacoes/checarTelefone';
import { checarCPF } from '../../validacoes/checarCPF';
import { checarCNPJ } from '../../validacoes/chegarCNPJ';
import { checarAniversario } from '../../validacoes/checarAniversario';
import { chegarSenha } from '../../validacoes/checarSenha';
import { checarConfirmacaoSenha } from '../../validacoes/chegarConfirmacaoSenha';
import { checarRegrasSenha } from '../../validacoes/chegarRegrasSenha';
import { checarSeUsuarioExite } from '../../validacoes/checarSeUsuarioExiste';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cadastroLoginSenha',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastroLoginSenha.component.html',
  styleUrl: './cadastroLoginSenha.component.css'
})
export class CadastroLoginSenhaComponent implements OnInit {
  constructor(private fb: FormBuilder, private localStorageService: LocalStorageService, private formService: FormService, private router: Router) { }
  form!: FormGroup;
  errorMessage: string | null = '';
  formSubscription: Subscription | undefined;
  public mostrarSenha:boolean = false;
  public mostrarConfirmacaoSenha:boolean = false;

  tipoPessoa: FormControl = new FormControl();

  ddds: number[] = [11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99];


  @Output() formCompleted = new EventEmitter<void>();



  onSubmit() {
    if (this.form.valid) {
        this.formCompleted.emit();    
    }
  }
  
  ngOnInit() {
    this.form = this.fb.group({
      nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100), checarNome()]),
      ddd: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
      telefone: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9), checarTelefone()]),
      email: new FormControl('', [Validators.required]),
      tipoPessoa: ['', Validators.required],
      cpf: ['', Validators.required], 
      cnpj: ['', Validators.required], 
      diaNascimento: new FormControl('', [Validators.required, checarAniversario()]),
      senha: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6), chegarSenha()]),
      confirmacaoSenha: new FormControl('', [Validators.required]),
    }, { validators: [checarConfirmacaoSenha(), checarRegrasSenha(), checarSeUsuarioExite(this.localStorageService)] });

    this.form.get('tipoPessoa')?.valueChanges.subscribe(value => {
      if (value === 'Fisica') {
          this.form.get('cpf')?.setValidators([Validators.required, Validators.minLength(11), Validators.maxLength(11), checarCPF()]);
          this.form.get('cnpj')?.clearValidators();
      } else {
          this.form.get('cnpj')?.setValidators([Validators.required, Validators.minLength(14), Validators.maxLength(14), checarCNPJ()]);
          this.form.get('cpf')?.clearValidators();
      }
      this.form.get('cpf')?.updateValueAndValidity();
      this.form.get('cnpj')?.updateValueAndValidity();
  });

    this.formSubscription = this.form.valueChanges.subscribe(values => {
      this.formService.setFormData(values);
    });
    this.formService.getFormData().subscribe(data => {
      if (data) {
        this.form.patchValue(data);
      }
    });
    console.log('Conteúdo do localStorage:', localStorage.getItem('users'));

  }

  redirectHome() {
    this.router.navigateByUrl('/home');
  }

  apagarLocalStorege(): void{
    this.localStorageService.clearLocalStorage();
  }

}
