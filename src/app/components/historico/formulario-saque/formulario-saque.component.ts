import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-formulario-saque',
  templateUrl: './formulario-saque.component.html',
  styleUrls: ['./formulario-saque.component.css']
})
export class FormularioSaqueComponent {
  valorSaque: number = 0;
  contaOrigemId: number = 999998

  constructor(public modal: NgbActiveModal, private http: HttpClient) { }

  fecharModal() {
    this.modal.dismiss('Fechar click');
  }

  sacar() {
    const body = { valor: this.valorSaque, contaOrigemId: this.contaOrigemId };
    this.http.post('http://localhost:5197/transacoes/saque', body).subscribe(
      response => {
        console.log('Saque realizado com sucesso:', response);
        this.modal.close('Saque concluído');
      },
      error => {
        console.error('Erro ao realizar saque:', error);
      }
    );
  }
}
