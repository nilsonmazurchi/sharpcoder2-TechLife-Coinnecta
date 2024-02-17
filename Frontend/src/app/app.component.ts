import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./pages/login/login.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, LoginComponent]
})
export class AppComponent {
  title = 'sharpcoder2-TechLife-Coinnecta';
}
