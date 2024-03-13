import {Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { SobreComponent } from './components/sobre/sobre.component';
import {SolutionsComponent} from "./components/solutions/solutions.component";
import { HistoricoComponent } from './pages/historico/historico.component';
import { AuthGuard} from './auth.guard';
import { CadastroLoginSenhaComponent } from './pages/cadastroLoginSenha/cadastroLoginSenha';
import { PgcadastroComponent } from './pages/pgcadastro/pgcadastro.component';
import { PgloginComponent } from './pages/pglogin/pglogin.component';



export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: PgloginComponent },
  { path: 'cadastro', loadComponent: () => import ('./pages/pgcadastro/pgcadastro.component').then (
    (m) => m.PgcadastroComponent
  ),},
  { path: 'solucoes', component: SolutionsComponent },
  { path: 'historico', component: HistoricoComponent, canActivate: [AuthGuard]  },
  { path: 'sobre', component: SobreComponent },
]
