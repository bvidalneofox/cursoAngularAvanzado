import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NoPageFoundComponent } from './shared/no-page-found/no-page-found.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    loadChildren: './pages/pages.module#PagesModule'
  },
  { path: '**', component: NoPageFoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot(routes, {useHash: true});