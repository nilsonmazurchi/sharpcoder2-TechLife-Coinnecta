import { Component } from '@angular/core';
import { TransacaoComponent } from "../transacao/transacao.component";

@Component({
    selector: 'app-extrato',
    standalone: true,
    templateUrl: './extrato.component.html',
    styleUrl: './extrato.component.css',
    imports: [TransacaoComponent]
})
export class ExtratoComponent {

}
