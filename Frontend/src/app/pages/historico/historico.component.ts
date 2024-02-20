import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricoNavComponent } from "../../components/historico/historico-nav/historico-nav.component";
import { InfoComponent } from "../../components/historico/info/info.component";
import { ExtratoComponent } from "../../components/historico/extrato/extrato.component";

@Component({
    selector: 'app-historico',
    standalone: true,
    templateUrl: './historico.component.html',
    styleUrl: './historico.component.css',
    imports: [CommonModule, HistoricoNavComponent, InfoComponent, ExtratoComponent]
})
export class HistoricoComponent {

}
