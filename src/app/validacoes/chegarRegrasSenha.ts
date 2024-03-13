import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checarRegrasSenha(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const senha = control.get('senha')?.value;
    const aniversario = control.get('aniversario')?.value;
    const cpf = control.get('cpf')?.value;

    if (!senha || !aniversario || !cpf) {
      return null;
    }


    const separadorAniversario = aniversario.split('-');
    if (separadorAniversario.length === 3) {
      const ddmmyy = separadorAniversario[2] + separadorAniversario[1] + separadorAniversario[0].slice(2);
      const ddmmyy2 = separadorAniversario[2] + separadorAniversario[1] + separadorAniversario[0].slice(0, 2);


      if (senha === ddmmyy || senha === ddmmyy2 || senha === cpf) {

        return { senhaIgualAniversario: true };
      }
    }


    const cpfSequencia = cpf.match(/.{1,6}/g);
    if (cpfSequencia && cpfSequencia.some((sequencia: string) => senha.includes(sequencia))) {

      return { senhaIgualCPF: true };
    }

    return null;
  };
}