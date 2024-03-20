import { CommonModule, Location } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { cadastroLoginSenhaTipo } from '../cadastroLoginSenha/cadastroLoginSenha-tipo';
import { checarCEP } from '../../validacoes/checarCEP';
import { buscarCepService } from '../../servico/buscar-cep.service';
import { LocalStorageService } from '../../servico/local-storage.service';
import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';
import { Subscription, catchError, take, throwError } from 'rxjs';
import { FormService } from '../../servico/form.service';
import { HttpClient } from '@angular/common/http';
import { BancoDeDadosService } from '../../servico/bcodados.service';

@Component({
  selector: 'app-cadastroEndereco',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cadastroEndereco.component.html',
  styleUrl: './cadastroEndereco.component.css'
})
export class CadastroEnderecoComponent {
  formSubscription: Subscription | undefined;


  constructor(private bancoDeDadosService: BancoDeDadosService, private http: HttpClient, private formBuilder: FormBuilder, private cepService: buscarCepService, private cdr: ChangeDetectorRef, private localStorageService: LocalStorageService, private router: Router, private formService: FormService) {

  }

  ufs: string[] = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO']
  private modalOpened = false;

  form!: FormGroup;
  errorMessage: string | null = '';
  searchAttempted: boolean = false;
  @Output() formCompleted = new EventEmitter<void>();
  @Output() goBack = new EventEmitter<void>();
  goBackClicked() {
    this.goBack.emit();
  }

  private trimFormValues(formValues: cadastroLoginSenhaTipo): cadastroLoginSenhaTipo {
    const trimmedValues: any = {};

    (Object.keys(formValues) as Array<keyof cadastroLoginSenhaTipo>).forEach(key => {
      const value = formValues[key];
      if (typeof value === 'string') {
        trimmedValues[key] = value.trim();
      } else {

        trimmedValues[key] = value;
      }
    });

    return trimmedValues as cadastroLoginSenhaTipo;
  }

  onSubmit() {
    if (this.form.valid) {
      const endereco = this.form.value;
      this.bancoDeDadosService.cadastroDeEndereco(endereco).subscribe(
        response => {
          console.log('Dados enviados com sucesso:', response);
        },
        error => {
          console.error('Erro ao enviar os dados:', error);
        }
      );

      this.formCompleted.emit();
      this.form.reset();
      this.formService.clearFormData();

    }
  }



  ngOnInit() {
    this.form = this.formBuilder.group({
      cep: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(8), checarCEP()]),
      uf: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]),
      cidade: new FormControl('', [Validators.required]),
      logradouro: new FormControl('', [Validators.required]),
      complemento: new FormControl(''),
      bairro: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      policies: new FormControl(false, Validators.requiredTrue)
    });

    this.formSubscription = this.form.valueChanges.subscribe(values => {
      this.formService.setFormData(values);
    });
    this.formService.getFormData().subscribe(data => {
      if (data) {
        this.form.patchValue(data);
      }
    });


  }

  buscarCEP() {

    this.searchAttempted = false;
    this.errorMessage = '';

    const cep = this.form.get('cep')?.value;
    if (cep && cep !== '') {
      this.searchAttempted = true;
      this.cepService.buscarCEP(cep).subscribe({
        next: (data) => {
          if (data.erro) {
            this.errorMessage = 'CEP não encontrado.';
          } else {
            this.form.patchValue({
              uf: data.uf,
              cidade: data.localidade,
              logradouro: data.logradouro,
              bairro: data.bairro,
            });
          }
          this.cdr.detectChanges();
        },
        error: () => {

          this.errorMessage = 'Erro ao buscar o CEP. Por favor, tente novamente.';
          this.cdr.detectChanges();
        }
      });
    } else {

      this.errorMessage = 'Formato de CEP inválido.';
      this.searchAttempted = true;
    }
  }

  @ViewChild('policiesModal') policiesModal!: ElementRef;
  @ViewChild('RejectPoliciesModal') rejectPoliciesModal!: ElementRef;

  openPoliciesModal() {
      const Policiesmodal = new bootstrap.Modal(this.policiesModal.nativeElement);
      Policiesmodal.show();
  }
  declinePoliciesModal() {
    const RejectModal = new bootstrap.Modal(this.rejectPoliciesModal.nativeElement);
    RejectModal.show();
    this.form.get('policies')?.setValue(false);
  }

}
