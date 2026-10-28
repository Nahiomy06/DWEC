import { Component, signal } from '@angular/core';
import { DeporteComponent } from './components/deporte-component/deporte-component';

@Component({
  imports: [DeporteComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('EjemploInputOutput');
}
