import { Component, signal } from '@angular/core';
import { ProductsListComponent } from './components/products-list-component/products-list-component';
import { ProductsFormComponent } from './components/products-form-component/products-form-component';

@Component({
  imports: [ProductsListComponent, ProductsFormComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Examen_16_11');
}
