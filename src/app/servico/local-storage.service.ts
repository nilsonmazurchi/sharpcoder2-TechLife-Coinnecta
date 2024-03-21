import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { registrosTipos } from '../tipos/tipos-registros';

export interface IUsuarioLogado {
  cpf?: string;
  cnpj?: string;
  nome: string;
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getUsuarioRegistrado(): any[] {
    const usuarioRegistrados = localStorage.getItem('usuarios');
    return usuarioRegistrados ? JSON.parse(usuarioRegistrados) : [];
  }
  getNome(cpf: string): string {
    const usuario = this.listaUsuario.find((usuario) => usuario.cpf === cpf);
    return usuario.nome;
  }
  getSenha(cpf: string): string {
    const usuario = this.listaUsuario.find((usuario) => usuario.cpf === cpf);
    return usuario.senha;
  }

  getSenhaCNPJ(cnpj: string): string {
    const usuario = this.listaUsuario.find((usuario) => usuario.cnpj === cnpj);
    return usuario.senha;
  }

  getNomeCNPJ(cnpj: string): string {
    const usuario = this.listaUsuario.find((usuario) => usuario.cnpj === cnpj);
    return usuario.nome;
  }

  getUsuarioLogado(): IUsuarioLogado | null {
    const usuario = localStorage.getItem('usuario');
    if (usuario !== null) {
      return JSON.parse(usuario);
    } else {
      return null;
    }
  }
  
  logout(): void {
    localStorage.removeItem('usuarioLogado');
  }

  private listaUsuario = this.getUsuarioRegistrado();

  checarEmailUsuarioExiste(email: string): boolean {
    const emailUsuarioExiste = this.listaUsuario.some((usuario) => usuario.email === email);

    return emailUsuarioExiste;
  }
  checarCPFUsuarioExiste(cpf: number): boolean {
    const CPFUsuarioExiste = this.listaUsuario.some((usuario) => usuario.cpf === cpf);

    return CPFUsuarioExiste;
  }

  checarCNPJUsuarioExiste(cnpj: number): boolean {
    const CNPJUsuarioExiste = this.listaUsuario.some((usuario) => usuario.cnpj === cnpj);

    return CNPJUsuarioExiste;
  }

  salvarUsuarioLocalStorage(usuario: registrosTipos): void {
    this.listaUsuario.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(this.listaUsuario));
  }

  salvarUsuarioLogadoLocalStorage(usuario: IUsuarioLogado): void {
    localStorage.setItem('usuariosLogado', JSON.stringify(usuario));
    console.log('Conteúdo do localStorage:', localStorage.getItem('usuariosLogado'));
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }

  getAllUsuarios(): registrosTipos[] {
    return this.listaUsuario;
  }
}
