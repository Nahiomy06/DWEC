import { Component, signal } from '@angular/core';
import { FormularioReactiveFormModel } from './components/formulario-reactive-form-model/formulario-reactive-form-model';

@Component({
  imports: [FormularioReactiveFormModel],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('ejemploReactiveForm');
}
