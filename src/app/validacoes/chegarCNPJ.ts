import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checarCNPJ(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cnpj = control.value;
    
    if (!cnpj) {
      return null;
    }
    
    if (!cnpj || !/^[\d]+$/.test(cnpj)) { // Validar apenas números
      return { cnpjInvalido: 'naoNumero' };
    }

    if (!cnpj || cnpj.length !== 14) {
      return { cnpjInvalido: 'tamanhoInvalido' };
    }

    const cnpjNumeros = cnpj.match(/\d/g);
    if (cnpjNumeros && cnpjNumeros.length === 14) {
      const cnpjStr = cnpjNumeros.join('');

      if (etodoDigitalIgual(cnpjStr)) {
        return { cnpjInvalido: 'todoDigitoIgual' };
      }

      if (!cnpjValido(cnpj)) {
        return { cnpjInvalido: true };
      }
    }

    return null;
  }
}

function etodoDigitalIgual(cnpj: string): boolean {
  return cnpj.split('').every((c) => c === cnpj[0]);
}

function cnpjValido(cnpj: string): boolean {
  // Remover caracteres não numéricos do CNPJ
  cnpj = cnpj.replace(/\D/g, '');

  // Verificar se o CNPJ tem 14 dígitos
  if (cnpj.length !== 14) {
    return false;
  }

  // Calcular o primeiro dígito verificador
  let soma = 0;
  let peso = 5;
  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpj.charAt(i)) * peso;
    peso--;
    if (peso === 1) {
      peso = 9;
    }
  }
  let resto = soma % 11;
  let digito1 = resto < 2 ? 0 : 11 - resto;

  // Calcular o segundo dígito verificador
  soma = 0;
  peso = 6;
  for (let i = 0; i < 13; i++) {
    soma += parseInt(cnpj.charAt(i)) * peso;
    peso--;
    if (peso === 1) {
      peso = 9;
    }
  }
  resto = soma % 11;
  let digito2 = resto < 2 ? 0 : 11 - resto;

  // Verificar se os dígitos verificadores calculados correspondem aos dígitos fornecidos
  return parseInt(cnpj.charAt(12)) === digito1 && parseInt(cnpj.charAt(13)) === digito2;
}
