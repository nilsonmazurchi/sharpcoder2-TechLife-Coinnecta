import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService, IUsuarioLogado } from '../../../servico/local-storage.service';
import { ExibirConteudoService } from '../../../servico/exibir-conteudo.service';
import { BancoDeDadosService } from '../../../servico/bcodados.service';
import { AuthService } from '../../../servico/auth.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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
  hasAccount: boolean = false;
  contaId!: number;


  constructor(private localStorageService: LocalStorageService, private exibirConteudoService: ExibirConteudoService, private bancoDeDadosService: BancoDeDadosService, private auth: AuthService) { }

  ngOnInit(): void {
  if (this.auth.userCpf) {
    const userId = this.auth.userId;
    this.getUserName(this.auth.userCpf);
    this.getContaPorUsuarioId(userId).subscribe((contaId: number) => {
      localStorage.setItem('contaId', contaId.toString());
      localStorage.setItem('usuarioId', userId.toString());
      const CPF = this.auth.userCpf;
      localStorage.setItem('CPF', CPF);
      
      this.verificarContaDoUsuario(userId);
      this.getSaldo(contaId);
      this.exibirConteudoService.exibirConteudo = true;
      window.location.reload();
      console.log(localStorage.getItem('CPF'));
      console.log(localStorage.getItem('contaId'))

    },
    (error: any) => {
      console.error('Erro ao obter a conta do usuário:', error);
      // Tome alguma ação alternativa aqui, se necessário
    });
  } else if (this.localStorageService) {
    const contaId = localStorage.getItem('contaId');
    const usuarioId = localStorage.getItem('usuarioId')
    if (contaId !== null) { // Verifica se contaId não é nulo antes de usá-lo
      console.log(contaId);
      const CPFLocalStorage = localStorage.getItem('CPF');
      console.log(CPFLocalStorage)
      const usuarioIdLocalStorage = usuarioId
      console.log(usuarioIdLocalStorage)
      if (CPFLocalStorage && usuarioIdLocalStorage) {
        this.getUserName(CPFLocalStorage);
        this.verificarContaDoUsuario(parseInt(usuarioIdLocalStorage, 10));
        this.getSaldo(parseInt(contaId, 10));
        this.exibirConteudoService.exibirConteudo = true;
        } else {
        console.error('Dados do usuário não encontrados no localStorage');
        // Tome alguma ação alternativa aqui, se necessário
      }
    } else {
      console.error('ContaId não encontrado no localStorage');
      // Tome alguma ação alternativa aqui, se necessário
    }
  } else {
    console.error('CPF do usuário não está definido');
    // Tome alguma ação alternativa aqui, como redirecionar para a página de login
  }
}


  getContaPorUsuarioId(usuarioId: number): Observable<number> {
    return this.bancoDeDadosService.getContaPorUsuarioId(usuarioId).pipe(
      map((response: any) => response.id), // Supondo que o ID da conta esteja no campo "id" da resposta
      catchError(error => {
        console.error('Erro ao obter o contaId:', error);
        throw error;
      })
    );
  }
  getUserName(userCpf: string): void {
    this.bancoDeDadosService.getNome(userCpf).subscribe(
      (response: any) => {
        this.userName = response.nome;
      },
      (error: any) => {
        console.error('Erro ao obter o nome:', error);
      }
    );
  }

  verificarContaDoUsuario(usuarioId: number): void {
    this.bancoDeDadosService.getSaldo(usuarioId).subscribe(
      (response: any) => {
        this.hasAccount = response.saldo !== 0;
      },
      (error: any) => {
        console.error('Erro ao verificar a conta do usuário:', error);
      }
    );
  }

  getSaldo(contaId: number): void {
    this.bancoDeDadosService.getSaldo(contaId).subscribe(
      (response: any) => {
        this.saldoConta = response.saldo;
        this.hasAccount = true;
      },
      (error: any) => {
        console.error('Erro ao coletar saldo:', error);
      }
    );
  }


  botaoConteudo(): void {
    const usuarioId = this.auth.userId;
    const dadosConta = {
      dataAbertura: new Date(),
      tipoConta: 0,
      statusConta: 0,
      saldo: 0,
      tempoDeAberturaConta: 0
    };

    this.bancoDeDadosService.criarContaCorrente(usuarioId, dadosConta).subscribe(
      (response: any) => {
        console.log('Conta corrente criada com sucesso:', response);
        const contaId = response.id;
        const userId = usuarioId;
        localStorage.setItem('contaId', contaId.toString());
        localStorage.setItem('usuarioId', userId.toString());
        const CPF = this.auth.userCpf;
        localStorage.setItem('CPF', CPF);
        this.getUserName(this.auth.userCpf);
        this.verificarContaDoUsuario(userId);
        this.getSaldo(contaId);
        this.exibirConteudoService.exibirConteudo = true;
        window.location.reload();
        console.log(localStorage.getItem('CPF'));
        console.log(localStorage.getItem('contaId'))
        
      },
      (error: any) => {
        console.error('Erro ao criar conta corrente:', error);
      }
    );

    this.exibirConteudoService.exibirConteudo = true;
  }

  

  get exibirConteudo(): boolean {
    return this.exibirConteudoService.exibirConteudo;
  }
}
