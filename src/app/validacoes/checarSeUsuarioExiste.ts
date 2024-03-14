import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { LocalStorageService } from '../servico/local-storage.service';


export function checarSeUsuarioExite(localStorageService: LocalStorageService): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const email = control.get('email')?.value;
        const cpf = control.get('cpf')?.value;
        const cnpj = control.get('cnpj')?.value;

        if (!email && !cpf) {
            return null;
        }

        const existeEmail = email ? localStorageService.checarEmailUsuarioExiste(email) : false;
        if (existeEmail) {
            return { emailUsuarioExiste: true };
        }
        const existeCPF = cpf ? localStorageService.checarCPFUsuarioExiste(cpf) : false;
        if (existeCPF) {
            return { cpfUsuarioExiste: true };
        }

        const existeCNPJ = cnpj ? localStorageService.checarCNPJUsuarioExiste(cnpj) : false; // Verifique se o CNPJ existe
        if (existeCNPJ) {
            return { cnpjUsuarioExiste: true }; // Retorne uma mensagem indicando que o CNPJ já está cadastrado
        }


        return null;
    };
}