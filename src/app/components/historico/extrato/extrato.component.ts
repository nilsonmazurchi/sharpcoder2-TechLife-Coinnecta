import { Component, OnInit } from '@angular/core';
import { TransacaoComponent } from "../transacao/transacao.component";
import { CommonModule, NgIf } from '@angular/common';
import { ExibirConteudoService } from '../../../servico/exibir-conteudo.service';
import { FormularioDepositoComponent } from '../formulario-deposito/formulario-deposito.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormularioSaqueComponent } from '../formulario-saque/formulario-saque.component';
import { FormularioTransferenciaComponent } from '../formulario-transferencia/formulario-transferencia.component';
import { AuthService } from '../../../servico/auth.service';
import { BancoDeDadosService } from '../../../servico/bcodados.service';
import { LocalStorageService } from '../../../servico/local-storage.service';
@Component({
    selector: 'app-extrato',
    standalone: true,
    templateUrl: './extrato.component.html',
    styleUrl: './extrato.component.css',
    imports: [TransacaoComponent, CommonModule, NgIf]
})
export class ExtratoComponent implements OnInit {
    transacoes: any[] = [];
    constructor(private exibirConteudoService: ExibirConteudoService,
                private localStorageService: LocalStorageService,             
                private bancoDeDadosService: BancoDeDadosService,  
                private auth: AuthService,
                private modalService: NgbModal) { }

    ngOnInit(): void {
        let contaId: number;

        contaId = Number(localStorage.getItem('contaId'));
        

        this.bancoDeDadosService.getTransacoesPorContaId(contaId)
      .subscribe(
        transacoes => {
          this.transacoes = transacoes;
          console.log('Transações da conta:', transacoes);
        },
        error => {
          console.error('Erro ao obter transações da conta:', error);
          // Lida com o erro, se necessário
        }
      );
    }

    get exibirConteudo(): boolean {
        return this.exibirConteudoService.exibirConteudo;
    }

    openDepositModal() {
        const modalRef = this.modalService.open(FormularioDepositoComponent);
        modalRef.componentInstance.userId = this.auth.userId;
        modalRef.componentInstance.CPF = this.auth.userCpf;
        
    }
    openWithdrawModal() {
        const modalRef = this.modalService.open(FormularioSaqueComponent);
    }
    openTransferModal() {
        const modalRef = this.modalService.open(FormularioTransferenciaComponent);
    }
}
