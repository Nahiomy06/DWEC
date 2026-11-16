import { ProductoService } from './services/producto-service';
import { Component, inject, signal } from '@angular/core';
import { ListaProductos } from './components/lista-productos/lista-productos';
import { ListaTotal } from './components/lista-total/lista-total';
import { ProductoForm } from './components/producto-form/producto-form';

@Component({
  imports: [ListaProductos, ListaTotal, ProductoForm],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('agoodshop');
}
