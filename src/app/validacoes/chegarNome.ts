import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checarNome(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = (control.value || '').trim();
    const palavras = valor.split(' ').filter(Boolean);

    const caracteresValidos = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]+$/;

    if (palavras.length < 2) {
      return { 'nomeInvalido': true, 'razao': 'Palavras Insuficientes' };
    }
    for (let palavra of palavras) {
      if (palavra.length < 2) {
        return { 'nomeInvalido': true, 'razao': 'Palavra muito pequena' };
      }
      if (!caracteresValidos.test(palavra)) {
        return { 'nomeINvalido': true, 'razao': 'Caracter Invalido' };
      }
    }

    return null;
  };
}