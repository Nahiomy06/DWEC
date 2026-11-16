import { Service, signal } from '@angular/core';
import { Iproducto } from '../interfaces/iproducto';

@Service()
export class ProductoService {
    private listaProductos = signal<Iproducto[]>([]);
    private currency = signal<string>("")

    constructor() {
        this.cargarProductos();
    }


    private cargarProductos() {
        fetch('http://localhost:8080/api/carrito')
            .then(response => response.json())
            .then(datos => {
                this.currency.set(datos.currency);
                this.listaProductos.set(datos.products as Iproducto[]);
            })
            .catch(error => {
                console.log("Error al conectar con la api -> " + error);
            });
    }

    addProducto(prod: Iproducto) {
        this.listaProductos.update(lista => [...lista, prod]);
    }

    eliminarProducto(sku: string) {
        this.listaProductos.update(lista => lista.filter(p => p.sku !== sku));
    }

    obtenerLista(): Iproducto[] {
        return this.listaProductos();
    }

    obtenerCurrency(): string {
        return this.currency();
    }
}
