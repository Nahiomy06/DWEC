import { Iproducto } from './../../interfaces/iproducto';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto-service';

@Component({
	imports: [ReactiveFormsModule],
	selector: 'app-producto-form',
	styleUrl: './producto-form.css',
	templateUrl: './producto-form.html',
})
export class ProductoForm {

	private productoService = inject(ProductoService);
	addProd: FormGroup;

	constructor() {
		this.addProd = new FormGroup({
			title: new FormControl(null, [Validators.required, Validators.minLength(3)]),
			sku: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z0-9]{10}$/)]),
			price: new FormControl(null, [Validators.required, Validators.min(0), Validators.pattern(/^(0|[1-9]\d*)([.,]\d{1,2})?$/)])
		});
	}

	// ngOnInit() {
	// 	this.addProd = new FormGroup({
	// 		title: new FormControl(null, [Validators.required, Validators.minLength(3)]),
	// 		sku: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z0-9]{10}$/)]),
	// 		price: new FormControl(null, [Validators.required, Validators.min(0), Validators.pattern(/^(0|[1-9]\d*)([.,]\d{1,2})?$/)])
	// 	}, [this.validarSku]);
	// }

	
	private validarSku(form: AbstractControl): any {
		let resultado: boolean = true;

		this.productoService.obtenerLista().forEach(prod => {
			if (prod.sku == form.get('sku')?.value) {
				resultado = false;
			}
		});

		return !resultado ? {skuValido: true} : null;
	}

	anadir(): void {
		let prod: Iproducto = this.addProd.value as Iproducto;
		this.productoService.addProducto(prod);

		this.addProd.reset();
	}

	checkControl(formControlName: string, validator: string): boolean | undefined {
		return this.addProd.get(formControlName)?.hasError(validator) &&
			this.addProd.get(formControlName)?.touched;
	}


}
