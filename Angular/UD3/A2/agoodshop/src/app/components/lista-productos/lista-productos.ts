import { ProductoService } from './../../services/producto-service';
import { Component, inject } from '@angular/core';
import { Producto } from '../producto/producto';

@Component({
	imports: [Producto],
	selector: 'app-lista-productos',
	styleUrl: './lista-productos.css',
	templateUrl: './lista-productos.html',
})
export class ListaProductos {
	
	productoService = inject(ProductoService);
}
