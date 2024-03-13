import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checarCPF(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cpf = control.value;
    
    if (!cpf) {
      return null;
    }
    
    if (!cpf || !/^[\d]+$/.test(cpf)) { // Validar apenas números
      return { cpfInvalido: 'naoNumero' };
    }

    if (!cpf || cpf.length !== 11) {
      return { cpfInvalido: 'tamanhoInvalido' };
    }

    const cpfNumeros = cpf.match(/\d/g);
    if (cpfNumeros && cpfNumeros.length === 11) {
      const cpfStr = cpfNumeros.join('');

      if (etodoDigitalIgual(cpfStr)) {
        return { cpfInvalido: 'todoDigitoIgual' };
      }

      if (!cpfValido(cpf)) {
        return { cpfInvalid: true };
      }
    }

    return null;
  }
}

function etodoDigitalIgual(cpf: string): boolean {
  return cpf.split('').every((c) => c === cpf[0]);
}

function cpfValido(cpf: string): boolean {
  for (let t = 9; t < 11; t++) {
    let d = 0;
    for (let c = 0; c < t; c++) {
      d += parseInt(cpf[c], 10) * (t + 1 - c);
    }
    d = (10 * d) % 11;
    if (d === 10 || d === 11) d = 0;
    if (d !== parseInt(cpf[t], 10)) return false;
  }
  return true;
}
