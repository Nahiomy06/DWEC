import { Page404 } from './pages/page404/page404';
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Contactos } from './pages/contactos/contactos';
import { ServiciosProfecionales } from './pages/servicios-profecionales/servicios-profecionales';
import { ServiciosDetail } from './pages/servicios-detail/servicios-detail';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: Home },
  { path: 'contacto', component: Contactos },
  { path: 'servicio', component: ServiciosProfecionales },
  { path: 'servicio-profesional/:url', component: ServiciosDetail },

  { path: '**', component: Page404 },
];
