import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function checarCEP(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
     
      return null;
    }
    
  
    const tirarHifen = /^[0-9]{8}$/;
    const validoCEP = tirarHifen.test(control.value);
    
    return validoCEP ? null : { cepInvalido: true };
  };
}
