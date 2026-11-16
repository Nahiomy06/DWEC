import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductoService } from '../../services/producto-service';
import { Iproducto } from '../../interfaces/iproducto';

@Component({
	imports: [],
	selector: 'app-lista-total',
	styleUrl: './lista-total.css',
	templateUrl: './lista-total.html',
	changeDetection: ChangeDetectionStrategy.Eager,
})

export class ListaTotal {

	productoService = inject(ProductoService);

	productosLista(): Iproducto[] {
		return this.productoService.obtenerLista().filter(prod => (prod.quantity ?? 0) > 0);
	}


	formatearImporte(importe: number): string {
		return importe.toFixed(2) + this.productoService.obtenerCurrency();
	}

	importeTotal(): string {
		let total: number = 0;

		this.productosLista().forEach(prod => {
			if (prod.quantity != null && prod.quantity > 0) {
				total+= (prod.price * prod.quantity);
			}
		})

		return this.formatearImporte(total);
	}
}
