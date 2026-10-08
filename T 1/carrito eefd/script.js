/*const carrito = [];

fetch("http://localhost:8080/api/carrito")
    .then(function (response) {
        return response.json();
    })
    .then(function (products) {
        products.products.forEach((product) => {
            console.log("Nuevo producto");
            carrito.push(product);
        });
    })
    .catch((response) => {
        console.log("Error al cargas el carrito");
    })
    .finally(() => {
        console.log("Se ha terminado la promesa");
        console.log(carrito);
    });
    export default class Carrito {
    #currency;
    #products;








    constructor(products = [], currency = "€") {
        this.#currency = currency;
        this.#products = products.map((p) => ({
            sku: p.SKU || p.sku,
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

*/
fetch("http://localhost:8080/api/carrito")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const productos = data.products;

        const contenedor = document.getElementById("lista-productos");

        productos.forEach(function (producto) {
            const columna = document.createElement("div");

            columna.classList.add("col-12", "col-sm-6", "col-lg-3");

            columna.innerHTML = `
                <div class="card h-100">

                    <img 
                        src="https://placehold.co/100x100"
                        class="card-img-top"
                        alt="${producto.title}"
                    >

                    <div class="card-body">

                        <h5 class="card-title">
                            ${producto.title}
                        </h5>

                        <p class="card-text mt-2">
                            Precio: ${producto.price} €
                        </p>

                        <label>
                            Unidades:
                            <input 
                                type="number"
                                min="0"
                                value="0"
                                data-sku="${producto.SKU}"
                                class="form-control"
                            >
                        </label>

                    </div>

                </div>
            `;

            contenedor.appendChild(columna);
        });
    })
    .catch(function (error) {
        console.log("Error al cargar los productos");
        console.log(error);
    });

```javascript
import Carrito from "./carrito.js";

let carrito;

fetch("http://localhost:8080/api/carrito")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        carrito = new Carrito(data.products);

        MostrarProductos(data.products);
    })
    .catch(function (error) {
        console.log("Error al cargar los productos");
        console.log(error);
    });


function MostrarProductos(productos) {

    const contenedor = document.getElementById("listaProductos");

    productos.forEach((producto) => {

        const linea = document.createElement("div");
        linea.classList.add("producto");


        const informacion = document.createElement("div");
        informacion.classList.add("productoInfo");

        const titulo = document.createElement("h3");
        titulo.textContent = producto.title;

        const referencia = document.createElement("p");
        referencia.textContent = "Ref: " + producto.SKU;

        informacion.appendChild(titulo);
        informacion.appendChild(referencia);


        const cantidad = document.createElement("div");
        cantidad.classList.add("cantidad");


        const btnMenos = document.createElement("button");
        btnMenos.textContent = "-";


        const input = document.createElement("input");
        input.type = "number";
        input.min = "0";
        input.value = "0";
        input.dataset.sku = producto.SKU;


        const btnMas = document.createElement("button");
        btnMas.textContent = "+";


        cantidad.appendChild(btnMenos);
        cantidad.appendChild(input);
        cantidad.appendChild(btnMas);


        const precio = document.createElement("div");
        precio.classList.add("precio");
        precio.textContent = producto.price + "€";


        const precioTotal = document.createElement("div");
        precioTotal.classList.add("seccionTotal");
        precioTotal.textContent = "0€";


        linea.appendChild(informacion);
        linea.appendChild(cantidad);
        linea.appendChild(precio);
        linea.appendChild(precioTotal);

        contenedor.appendChild(linea);


        // BOTÓN MENOS

        btnMenos.addEventListener("click", function () {

            let unidades = Number(input.value);

            if (unidades > 0) {
                unidades--;
            }

            input.value = unidades;

            actualizarProducto(
                producto,
                unidades,
                precioTotal
            );
        });


        // BOTÓN MÁS

        btnMas.addEventListener("click", function () {

            let unidades = Number(input.value);

            unidades++;

            input.value = unidades;

            actualizarProducto(
                producto,
                unidades,
                precioTotal
            );
        });


        // CAMBIAR CANTIDAD MANUALMENTE

        input.addEventListener("change", function () {

            let unidades = Number(input.value);

            if (unidades < 0 || isNaN(unidades)) {
                unidades = 0;
            }

            input.value = unidades;

            actualizarProducto(
                producto,
                unidades,
                precioTotal
            );
        });
    });
}


function actualizarProducto(producto, unidades, precioTotal) {

    carrito.actualizarUnidades(
        producto.SKU,
        unidades
    );


    const subtotal =
        Number(producto.price) * unidades;


    precioTotal.textContent =
        subtotal.toFixed(2) + "€";


    actualizarTotal();
}


function actualizarTotal() {

    const informacionCarrito =
        carrito.obtenerCarrito();


    const total =
        document.getElementById("total");


    total.textContent =
        informacionCarrito.total +
        informacionCarrito.currency;
}
```;
