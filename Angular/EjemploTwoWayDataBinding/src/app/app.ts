import { Component, signal } from '@angular/core';
import { AficionesComponents } from './components/aficiones-components/aficiones-components';

@Component({
  imports: [AficionesComponents],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('EjemploTwoWayDataBinding');
}
