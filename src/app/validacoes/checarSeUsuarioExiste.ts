import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, combineLatest, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { BancoDeDadosService } from '../servico/bcodados.service';

export function checarSeUsuarioExiste(bancoDeDadosService: BancoDeDadosService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        const emailControl = control.get('email');
        const cpfControl = control.get('cpf');
        const cnpjControl = control.get('cnpj');

        if (!emailControl && !cpfControl) {
            return of(null); // Retorna um observable vazio se nenhum campo estiver preenchido
        }

        const email = emailControl?.value;
        const cpf = cpfControl?.value;
        const cnpj = cnpjControl?.value;
        
        const existeEmail$ = email ? bancoDeDadosService.checarEmailUsuarioExiste(email) : of(false);
        const existeCPF$ = cpf ? bancoDeDadosService.checarCPFUsuarioExiste(cpf) : of(false);
        const existeCNPJ$ = cnpj ? bancoDeDadosService.checarCNPJUsuarioExiste(cnpj) : of(false);

        const observableCombinado = combineLatest([existeEmail$, existeCPF$, existeCNPJ$]).pipe(
            map(([existeEmail, existeCPF, existeCNPJ]) => {
                const errors: ValidationErrors = {};

                if (existeEmail) {                    
                    errors['emailUsuarioExiste'] = true;
                } else {
                    errors['emailUsuarioExiste'] = false;
                }

                if (existeCPF) {
                    errors['cpfUsuarioExiste'] = true;
                } else {
                    errors['cpfUsuarioExiste'] = false;
                }

                if (existeCNPJ) {
                    errors['cnpjUsuarioExiste'] = true;
                } else {
                    errors['cnpjUsuarioExiste'] = false;
                }

                return Object.keys(errors).length > 0 ? errors : null;
            }),
            take(1) // Completa o observable após a primeira emissão
        );

        observableCombinado.subscribe(resultado => {
            console.log('Resultado final:', resultado);
        });

        return observableCombinado;
    };
}

export function extrairResultadoObservable(observable: Observable<ValidationErrors | null> | Promise<ValidationErrors | null>): Promise<ValidationErrors | null> {
    if (observable instanceof Observable) {
        return new Promise((resolve, reject) => {
            observable.subscribe({
                next: resultado => {
                    console.log('Resultado final:', resultado);
                    resolve(resultado);
                },
                error: err => {
                    console.error('Ocorreu um erro ao extrair o resultado:', err);
                    reject(err);
                }
            });
        });
    } else {
        return observable;
    }
}
