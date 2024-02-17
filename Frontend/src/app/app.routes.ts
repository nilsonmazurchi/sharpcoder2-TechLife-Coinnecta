import {Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import { LoginComponent } from './pages/login/login.component';
import { SobreComponent } from './components/sobre/sobre.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sobre', component: SobreComponent },
]
