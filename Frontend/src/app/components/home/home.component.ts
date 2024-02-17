import { Component } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {CarouselComponent} from "../carousel/carousel.component";
import {CardsHomeComponent} from "../cards-home/cards-home.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, CarouselComponent, CardsHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
