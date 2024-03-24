import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService, IUsuarioLogado } from '../../../servico/local-storage.service';
import { ExibirConteudoService } from '../../../servico/exibir-conteudo.service';
import { BancoDeDadosService } from '../../../servico/bcodados.service';
import { usuarioCadastrado } from '../../../modelos/usuarioCadastrado';
import { AuthService } from '../../../servico/auth.service';


@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent implements OnInit {
  saldoConta!: number;
  user!: IUsuarioLogado;
  userName!: string;

  constructor(private localStorageService: LocalStorageService, private exibirConteudoService: ExibirConteudoService, private bancoDeDadosService: BancoDeDadosService, private auth: AuthService) { }

  ngOnInit(): void {
    this.bancoDeDadosService.getNome(this.auth.userCpf).subscribe(
      (response: any) => {
        this.userName = response.nome;
      },
      (error: any) => {
        console.error('Erro ao obter o nome:', error);
      });
  }

  botaoConteudo() {
    
    // ENTRADA DO USUARIO ID
    const usuarioId = this.auth.userId;
    
    const dadosConta = {
      dataAbertura: new Date(),
      tipoConta: 0,
      statusConta: 0,
      saldo: 0,
      tempoDeAberturaConta: 0
    }
    // Cria a conta e depois coletar o saldo
    this.bancoDeDadosService.criarContaCorrente(usuarioId, dadosConta).subscribe(
      (response) => {
        console.log('Conta corrente criada com sucesso:', response);
        const contaId = response.id;
        this.getSaldo(contaId);
      },
      (error) => {
        console.error('Erro ao criar conta corrente:', error);
      }
      );
      
      
    this.exibirConteudoService.exibirConteudo = true;
  }

  getSaldo(contaId: number) {
    this.bancoDeDadosService.getSaldo(contaId).subscribe(
      (response) => {
        console.log('saldo coletado com sucesso:', response);
        this.saldoConta = response.saldo;
      },
      (error) => {
        console.error('Erro ao ccoletar saldo:', error);
      }
    );
  }


  get exibirConteudo(): boolean {
    return this.exibirConteudoService.exibirConteudo;
  }
}
