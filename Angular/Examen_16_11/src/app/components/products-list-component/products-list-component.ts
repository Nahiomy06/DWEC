import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IProduct } from '../../Interfaces/iproduct';
import { ProductService } from '../../Services/product-service';
import { ProductsCardComponent } from '../products-card-component/products-card-component';

@Component({
  imports: [ProductsCardComponent],
  selector: 'app-products-list-component',
  styleUrl: './products-list-component.css',
  templateUrl: './products-list-component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ProductsListComponent {
  private productService = inject(ProductService);
  arrayProductos: IProduct[];

  constructor() {
    this.arrayProductos = [];
  }

  ngOnInit(): void {
    this.arrayProductos = this.productService.getAllProducts();
  }

  actualizarLista() {
    this.arrayProductos = this.productService.getAllProducts();
  }
}
