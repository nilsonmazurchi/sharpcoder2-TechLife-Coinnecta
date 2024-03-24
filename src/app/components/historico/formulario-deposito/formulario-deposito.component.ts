import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-formulario-deposito',
  templateUrl: './formulario-deposito.component.html',
  styleUrls: ['./formulario-deposito.component.css']
})
export class FormularioDepositoComponent {
  valorDeposito: number = 0;
  contaDestinoId: number = 123456;

  constructor(public modal: NgbActiveModal, private http: HttpClient) { }

  fecharModal() {
    this.modal.dismiss('Fechar click');
  }

  depositar() {
    const body = { valor: this.valorDeposito, contaDestinoId: this.contaDestinoId };
    this.http.post('http://localhost:5197/transacoes/deposito', body).subscribe(
      response => {
        console.log('Depósito realizado com sucesso:', response);
        this.modal.close('Depósito concluído');
      },
      error => {
        console.error('Erro ao realizar depósito:', error);
      }
    );
  }
}


