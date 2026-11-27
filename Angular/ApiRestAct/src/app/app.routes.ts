import { UserView } from './pages/user-view/user-view';
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Page404 } from './pages/page404/page404';
import { UserForm } from './pages/user-form/user-form';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: Home },
  { path: 'usre/:id', component: UserView },
  { path: 'newuser', component: UserForm },
  { path: 'upsateuser/:id', component: UserForm },

  { path: '**', component: Page404 },
];
