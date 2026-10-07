export default class Carrito {
    #currency;
    #products;

    constructor(products = [], currency = "€") {
        this.#currency = currency;
        this.#products = products.map((p) => ({
            sku: p.SKU,
            title: p.title,
            price: parseFloat(p.price),
            stock: 0,
        }));
    }

    actualizarStock() {
        const product = this.#products.find((p) => p.SKU === SKU);

        if (product) {
            product.stock = Math.max(0, parseInt(unidades) || 0);
        }
    }
}
