import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { BancoDeDadosService } from '../../../servico/bcodados.service';
import { LocalStorageService } from '../../../servico/local-storage.service';
import { AuthService } from '../../../servico/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-formulario-transferencia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-transferencia.component.html',
  styleUrls: ['./formulario-transferencia.component.css']
})
export class FormularioTransferenciaComponent {
  valorTransferencia: number = 0;
  contaDestinoId: number = 0; 
  contaOrigemId: number = 0;

  constructor(public modal: NgbActiveModal,
    private bancoDeDadosService: BancoDeDadosService,
    private localStorageService: LocalStorageService, 
    private auth: AuthService,
    private http: HttpClient) { }

  fecharModal() {
    this.modal.dismiss('Fechar click');
  }

  transferir() {
    console.log(this.contaOrigemId);
    const usuarioIdLocalStorage = localStorage.getItem('usuarioId');
  
    if (usuarioIdLocalStorage !== null) {
      this.contaOrigemId = parseInt(usuarioIdLocalStorage, 10);
      console.log(this.contaOrigemId)
      console.log(this.contaDestinoId)
      const body = { valor: this.valorTransferencia, contaOrigemId: this.contaOrigemId, contaDestinoId: this.contaDestinoId };
      this.http.post('http://localhost:5197/transacoes/transferencia', body).subscribe(
        response => {
          console.log('Transferência realizada com sucesso:', response);
          this.modal.close('Transferência concluída');
          
      },
      error => {
        console.error('Erro ao realizar transferência:', error);
      }
    );
  } else {
    console.error('Usuário não encontrado no armazenamento local.');
  }
  window.location.reload();
}
}
