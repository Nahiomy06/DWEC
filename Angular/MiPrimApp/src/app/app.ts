import { Gifs } from './component/gifs/gifs';
import { Component, signal } from '@angular/core';
import { Buttons } from './component/buttons/buttons';

@Component({
  imports: [Buttons, Gifs],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('MiPrimApp');
}
