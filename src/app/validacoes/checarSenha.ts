import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function chegarSenha(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;
    const valida = /^[0-9]{6}$/.test(valor);

    return valida ? null : { senhaInvalida: true };
  };
}
