import { Component, Input } from '@angular/core';
import { Iproducto } from '../../interfaces/iproducto';
import { FormsModule } from '@angular/forms';

@Component({
	imports: [FormsModule],
	selector: 'tr[app-producto]',
	styleUrl: './producto.css',
	templateUrl: './producto.html',
})
export class Producto {
	@Input() prod!: Iproducto;
	@Input() currency!: string;

	cantidad: number;
	totalProducto: string;

	constructor() {
		this.cantidad = 0;
		this.totalProducto = "";
	}

	ngOnInit() {
		this.totalProducto = "0.00" + this.currency;
	}

	sumar() {
		this.cantidad+= 1;
		this.prod.quantity = this.cantidad;

		this.totalProducto = (this.cantidad * this.prod.price).toFixed(2) + this.currency;
	}

	restar() {
		if (!(this.cantidad <= 0)) {
			this.cantidad-= 1;
		}

		this.prod.quantity = this.cantidad;
		this.totalProducto = (this.cantidad * this.prod.price).toFixed(2) + this.currency;
	}

	input() {
		if (this.cantidad < 0) {
			this.cantidad = 0;
		}

		this.prod.quantity = this.cantidad;
		this.totalProducto = (this.cantidad * this.prod.price).toFixed(2) + this.currency;
	}

}

