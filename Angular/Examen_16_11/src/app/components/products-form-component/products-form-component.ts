import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../Services/product-service';
import { IProduct } from '../../Interfaces/iproduct';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-products-form-component',
  styleUrl: './products-form-component.css',
  templateUrl: './products-form-component.html',
})
export class ProductsFormComponent {
  ProductoForm: FormGroup;
  private productService = inject(ProductService);

  constructor() {
    this.ProductoForm = new FormGroup({
      id: new FormControl(null, []),
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(300),
      ]),
      price: new FormControl(null, [Validators.required, Validators.min(0)]),
      category: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      image: new FormControl(null, [Validators.required]),
      active: new FormControl(null, []),
    });
  }

  getDataForm(): void {
    let producto: IProduct = this.ProductoForm.value as IProduct;

    this.productService.addNewProduct(producto);

    this.ProductoForm.reset();

    this.productService.getAllProducts();
  }

  checkControl(FormControlName: string, Validator: string): boolean | undefined {
    return (
      this.ProductoForm.get(FormControlName)?.hasError(Validator) &&
      this.ProductoForm.get(FormControlName)?.touched
    );
  }
}
