import {Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { SobreComponent } from './components/sobre/sobre.component';
import {SolutionsComponent} from "./components/solutions/solutions.component";
import { HistoricoComponent } from './pages/historico/historico.component';
import { AuthGuard} from './auth.guard';



export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'solucoes', component: SolutionsComponent },
  { path: 'historico', component: HistoricoComponent, canActivate: [AuthGuard]  },
  { path: 'sobre', component: SobreComponent },
]
