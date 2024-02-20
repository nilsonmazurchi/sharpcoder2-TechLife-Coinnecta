import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-cards-home',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './cards-home.component.html',
  styleUrl: './cards-home.component.css'
})
export class CardsHomeComponent {

}
