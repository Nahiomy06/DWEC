import { Service } from '@angular/core';
import { IProduct } from '../Interfaces/iproduct';

@Service()
export class ProductService {
  private arrayProductos: IProduct[];
  private url: string = 'http://localhost:8080/api/products';

  private id: number;

  constructor() {
    this.arrayProductos = [];
    this.connectProductos();
    this.id = this.arrayProductos.length;
  }

  private connectProductos() {
    fetch(this.url)
      .then((response) => response.json())
      .then((datos) => {
        datos.forEach((element: any) => {
          let producto: IProduct = element as IProduct;
          this.arrayProductos.push(producto);
        });
      });

    console.log(this.arrayProductos);
    return this.arrayProductos;
  }

  getAllProducts(): IProduct[] {
    /*fetch(this.url)
      .then((response) => response.json())
      .then((datos) => {
        datos.forEach((element: any) => {
          let producto: IProduct = element as IProduct;
          this.arrayProductos.push(producto);
        });
      });

    console.log(this.arrayProductos);
    */
    return this.arrayProductos;
  }

  addNewProduct(producto: IProduct) {
    if (!this.arrayProductos.includes(producto) && producto != null) {
      this.id = this.arrayProductos.length;
      producto.id = this.id.toString();
      this.id++;
      this.arrayProductos.push(producto);
      this.arrayProductos.length.toString();
      console.log(this.arrayProductos);
    }
  }

  deleteProducto(miProducto: IProduct) {
    this.arrayProductos = this.arrayProductos.filter(
      (producto) => producto.name !== miProducto.name,
    );
  }
}
