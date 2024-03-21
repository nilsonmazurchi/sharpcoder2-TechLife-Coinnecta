import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checarAniversario(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null;
        }

        const dataInserida = new Date(control.value);
        const dataAtual = new Date();


        dataAtual.setHours(0, 0, 0, 0);

        if (dataInserida >= dataAtual) {

            return { diaNascimentoInvalido: true };
        }
        if (dataInserida.getFullYear() < 1900) {
            return { anoErrado: true };
        }
        if(dataInserida.getFullYear() > new Date().getFullYear()){
            return { anoFuturo: true };
        }
        if(dataInserida.getMonth()>12){
            return { mesErrado: true };
        }
        if(dataInserida.getDate()>31){
            return { diaErrado: true };
        }
        if(dataInserida.getMonth()===2 && dataInserida.getDate()>29){
            return { diaErrado: true };
        }
        
        if ([3, 5, 8, 10].includes(dataInserida.getMonth()) && dataInserida.getDate() > 30) {
            return { diaErrado: true };
        }
        return null;
    };
}
