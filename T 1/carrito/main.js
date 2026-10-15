import Carrito from "./carrito.js";

let carrito;

fetch("http://localhost:8080/api/carrito")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        carrito = new Carrito(data.products);
        MostrarProductos(data.products);
        actualizarTotal();
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

        const titulo = document.createElement("h4");
        titulo.textContent = producto.title;

        const referencia = document.createElement("p");
        referencia.textContent = "Ref: " + producto.sku;

        informacion.appendChild(titulo);
        informacion.appendChild(referencia);

        const cantidad = document.createElement("div");
        cantidad.classList.add("cantidad");

        const btnMenos = document.createElement("button");
        btnMenos.textContent = "-";

        btnMenos.addEventListener("click", function () {
            if (Number(input.value) > 0) {
                input.value = Number(input.value) - 1;
                actualizarPrecioProducto();
            }
        });

        const input = document.createElement("input");
        input.type = "number";
        input.min = "0";
        input.value = "0";
        input.dataset.sku = producto.sku;
        input.addEventListener("input", actualizarPrecioProducto);

        const btnMas = document.createElement("button");
        btnMas.textContent = "+";

        btnMas.addEventListener("click", function () {
            input.value = Number(input.value) + 1;
            actualizarPrecioProducto();
        });

        cantidad.appendChild(btnMenos);
        cantidad.appendChild(input);
        cantidad.appendChild(btnMas);

        const precio = document.createElement("div");
        precio.classList.add("precio");
        precio.textContent = producto.price + "€";

        const precioTotal = document.createElement("div");
        precioTotal.classList.add("seccionTotal");
        precioTotal.textContent = "0€";

        function actualizarPrecioProducto() {
            const unidades = Number(input.value);
            const sku = producto.sku;

            carrito.actualizarUnidades(sku, unidades);

            const subtotal = Number(producto.price) * unidades;
            precioTotal.textContent = subtotal.toFixed(2) + "€";
            actualizarTotal();
        }

        linea.appendChild(informacion);
        linea.appendChild(cantidad);
        linea.appendChild(precio);
        linea.appendChild(precioTotal);

        contenedor.appendChild(linea);
    });
}
function actualizarTotal() {
    const info = carrito.obtenerCarrito();
    document.getElementById("productosCarrito").textContent =
        info.total + info.currency;

    const contenedor = document.getElementById("productosCarrito");
    contenedor.replaceChildren();

    info.products.forEach((producto) => {
        const linea = document.createElement("div");
        linea.classList.add("d-flex", "justify-content-between", "mb-2");

        const nombre = document.createElement("span");
        nombre.classList.add("text-body");
        nombre.textContent = producto.title;

        const precio = document.createElement("span");
        precio.classList.add("text-body");
        precio.textContent = producto.subtotal.toFixed(2) + "€";

        linea.appendChild(nombre);
        linea.appendChild(precio);

        contenedor.appendChild(linea);
    });

    const lineaSeparadora = document.createElement("hr");

    contenedor.appendChild(lineaSeparadora);

    const lineaTotal = document.createElement("div");
    lineaTotal.classList.add("d-flex", "justify-content-between", "fw-bold");
    lineaTotal.classList.add(
        "d-flex",
        "justify-content-between",
        "align-items-center",
    );

    const textoTotal = document.createElement("span");
    textoTotal.classList.add(
        "text-uppercase",
        "small",
        "fw-medium",
        "text-secondary",
    );
    textoTotal.textContent = "Total";

    const precioTotal = document.createElement("span");
    precioTotal.classList.add("fw-bold", "fs-5");
    precioTotal.textContent = info.total + info.currency;

    lineaTotal.appendChild(textoTotal);
    lineaTotal.appendChild(precioTotal);

    contenedor.appendChild(lineaTotal);
}
