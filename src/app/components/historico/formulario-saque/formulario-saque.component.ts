import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { BancoDeDadosService } from '../../../servico/bcodados.service';
import { LocalStorageService } from '../../../servico/local-storage.service';
import { AuthService } from '../../../servico/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-formulario-saque',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-saque.component.html',
  styleUrls: ['./formulario-saque.component.css']
})
export class FormularioSaqueComponent {
  valorSaque: number = 0;
  contaOrigemId: number = 0

  constructor(public modal: NgbActiveModal, 
    private bancoDeDadosService: BancoDeDadosService,
    private localStorageService: LocalStorageService, 
    private auth: AuthService,
    private http: HttpClient) { }

  fecharModal() {
    this.modal.dismiss('Fechar click');
  }

  sacar() {
    console.log(this.contaOrigemId);
    const contaIdLocalStorage = localStorage.getItem('contaId');
    if (contaIdLocalStorage !== null) {
      this.contaOrigemId = parseInt(contaIdLocalStorage, 10);
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
  } else {
    console.error('Usuário não encontrado no armazenamento local.');
  }
   window.location.reload();
}
}
