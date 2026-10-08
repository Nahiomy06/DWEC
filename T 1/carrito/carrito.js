export default class Carrito {
    constructor(productos) {
        this.productos = productos;
        this.unidades = new Map();
    }

    actualizarUnidades(sku, unidades) {
        unidades = Number(unidades);

        if (unidades <= 0) {
            this.unidades.delete(sku);
        } else {
            this.unidades.set(sku, unidades);
        }
    }

    obtenerInfoProducto(sku) {
        const producto = this.productos.find(
            (producto) => producto.SKU === sku,
        );
        if (!producto) {
            return null;
        }

        return {
            ...producto,
            quantity: this.unidades.get(sku) || 0,
        };
    }

    obtenerCarrito() {
        const productosCarrito = [];
        this.unidades.forEach((cantidad, sku) => {
            const producto = this.obtenerInfoProducto(sku);

            if (producto) {
                productosCarrito.push({
                    ...producto,
                    quantity: cantidad,
                    subtotal: Number(producto.price) * cantidad,
                });
            }
        });

        const total = productosCarrito.reduce(
            (acumulado, producto) => acumulado + producto.subtotal,
            0,
        );

        return {
            total: total.toFixed(2),
            currency: "€",
            products: productosCarrito,
        };
    }
}
