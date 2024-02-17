import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.css'
})
export class SobreComponent {

}
