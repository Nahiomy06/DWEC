import { Component, Input, inject } from '@angular/core';
import { IProduct } from '../../Interfaces/iproduct';
import { ProductService } from '../../Services/product-service';

@Component({
  imports: [],
  selector: 'app-products-card-component',
  styleUrl: './products-card-component.css',
  templateUrl: './products-card-component.html',
})
export class ProductsCardComponent {
  @Input() miProducto!: IProduct;

  private productService = inject(ProductService);

  deleteProducto(miProducto: IProduct) {
    this.productService.deleteProducto(miProducto);
  }
}
