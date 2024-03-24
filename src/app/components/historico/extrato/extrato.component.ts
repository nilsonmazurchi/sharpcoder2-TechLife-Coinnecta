import { Component, OnInit } from '@angular/core';
import { TransacaoComponent } from "../transacao/transacao.component";
import { CommonModule, NgIf } from '@angular/common';
import { ExibirConteudoService } from '../../../servico/exibir-conteudo.service';
import { FormularioDepositoComponent } from '../formulario-deposito/formulario-deposito.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormularioSaqueComponent } from '../formulario-saque/formulario-saque.component';
import { FormularioTransferenciaComponent } from '../formulario-transferencia/formulario-transferencia.component';

@Component({
    selector: 'app-extrato',
    standalone: true,
    templateUrl: './extrato.component.html',
    styleUrl: './extrato.component.css',
    imports: [TransacaoComponent, CommonModule, NgIf]
})
export class ExtratoComponent implements OnInit {
    constructor(private exibirConteudoService: ExibirConteudoService, private modalService: NgbModal) { }

    ngOnInit(): void {
    }

    get exibirConteudo(): boolean {
        return this.exibirConteudoService.exibirConteudo;
    }

    openDepositModal() {
        const modalRef = this.modalService.open(FormularioDepositoComponent);
        // pode passar dados para o modal usando modalRef.componentInstance
        // exemplo: modalRef.componentInstance.dados = seusDados;
    }
    openWithdrawModal() {
        const modalRef = this.modalService.open(FormularioSaqueComponent);
    }
    openTransferModal() {
        const modalRef = this.modalService.open(FormularioTransferenciaComponent);
    }
}
