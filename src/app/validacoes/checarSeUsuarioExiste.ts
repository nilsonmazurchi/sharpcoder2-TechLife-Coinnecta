import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, combineLatest, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BancoDeDadosService } from '../servico/bcodados.service';

export function checarSeUsuarioExiste(bancoDeDadosService: BancoDeDadosService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        const email = control.get('email')?.value;
        console.log(email)

        if (!email) {
            return of(); // Retorna um observable vazio se nenhum campo estiver preenchido
        }
        console.log("parei aqui")
        return bancoDeDadosService.checarEmailUsuarioExiste(email).pipe(
            map(existe => (existe ? { emailUsuarioExiste: true } : {emailUsuarioExiste: false})),
            catchError(error => {
                console.error('Erro ao verificar se o usuário existe:', error);
                return of(null); // Lidar com o erro retornando null
            })
        );
};
}