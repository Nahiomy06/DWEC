import { Component, signal } from '@angular/core';
import { Formlulario } from './components/formlulario/formlulario';
import { WorkerList } from './components/worker-list/worker-list';

@Component({
  imports: [Formlulario, WorkerList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('EjemploFormTemplate');
}
