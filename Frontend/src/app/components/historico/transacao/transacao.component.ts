import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transacao',
  standalone: true,
  imports: [],
  templateUrl: './transacao.component.html',
  styleUrl: './transacao.component.css'
})
export class TransacaoComponent {
  @Input() titulo: string = '';
  @Input() conta: string = '';
  @Input() valor: number = 0;
  @Input() data: string = '';
}
