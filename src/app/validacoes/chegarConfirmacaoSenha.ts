import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';


export function checarConfirmacaoSenha(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {

    if (!(formGroup instanceof FormGroup)) {
      return null;
    }

    const senhaControle = formGroup.get('senha');
    const confirmacaoSenhaControle = formGroup.get('confirmacaoSenha');
    


    if (!senhaControle || !confirmacaoSenhaControle) {
      return null;
    }

    const senha = senhaControle.value;
    const confirmacaoSenha = confirmacaoSenhaControle.value;


    if (!senha || !confirmacaoSenha) {
      return null;
    }


    return senha === confirmacaoSenha ? null : { 'senhaCombina': true };
  };
}
