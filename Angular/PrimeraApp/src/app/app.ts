
import { ComponenteHijoComponent } from './component/componente-hijo/componente-hijo.component';
import { Component, signal } from '@angular/core';
import { ComponenteHijo2Component } from './component/componente-hijo2/componente-hijo2.component';
import { ComponenteHijo3Component } from './component/componente-hijo3/componente-hijo3.component';

@Component({
  imports: [ComponenteHijoComponent, ComponenteHijo2Component, ComponenteHijo3Component],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('PrimeraApp');
}
