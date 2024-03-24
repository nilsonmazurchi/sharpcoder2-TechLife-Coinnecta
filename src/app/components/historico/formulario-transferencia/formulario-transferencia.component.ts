import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-formulario-transferencia',
  templateUrl: './formulario-transferencia.component.html',
  styleUrls: ['./formulario-transferencia.component.css']
})
export class FormularioTransferenciaComponent {
  valorTransferencia: number = 0; /////////
  contaDestino: number = 123456; /////////
  contaOrigem: number = 999998; /////////

  constructor(public modal: NgbActiveModal, private http: HttpClient) { }

  fecharModal() {
    this.modal.dismiss('Fechar click');
  }

  transferir() {
  const body = { valor: this.valorTransferencia, contaOrigem: this.contaOrigem, contaDestino: this.contaDestino };
    this.http.post('http://localhost:5197/transacoes/transferencia', body).subscribe(
      response => {
        console.log('Transferência realizada com sucesso:', response);
        this.modal.close('Transferência concluída');
      },
      error => {
        console.error('Erro ao realizar transferência:', error);
      }
    );
  }
}
