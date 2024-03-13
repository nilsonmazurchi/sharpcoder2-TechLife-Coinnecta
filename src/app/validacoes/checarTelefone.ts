import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checarTelefone(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    
    const regex = /^9\d{8}$/;
    const valido = regex.test(control.value);
    return valido ? null : { 'telefoneInvalido': true };
  };
}