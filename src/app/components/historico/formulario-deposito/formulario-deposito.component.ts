import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { BancoDeDadosService } from '../../../servico/bcodados.service';
import { LocalStorageService } from '../../../servico/local-storage.service';
import { AuthService } from '../../../servico/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-formulario-deposito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-deposito.component.html',
  styleUrls: ['./formulario-deposito.component.css']
})
export class FormularioDepositoComponent {
  valorDeposito: number = 0;
  contaDestinoId: number = 0;

  constructor(public modal: NgbActiveModal, 
    private bancoDeDadosService: BancoDeDadosService,
    private localStorageService: LocalStorageService, 
    private auth: AuthService,
    private http: HttpClient) { 
      
    }

  fecharModal() {
    this.modal.dismiss('Fechar click');
  }

  depositar() {    
    const contaIdLocalStorage = localStorage.getItem('contaId');
    console.log(contaIdLocalStorage)
  
    if (contaIdLocalStorage !== null) {
      this.contaDestinoId = parseInt(contaIdLocalStorage, 10);
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
    } else {
      console.error('Usuário não encontrado no armazenamento local.');
    }
    window.location.reload();
  }
}


