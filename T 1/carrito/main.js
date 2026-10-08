import Carrito from "./carrito.js";

let carrito;

fetch("http://localhost:8080/api/carrito")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
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

        const titulo = document.createElement("h4");
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
    });
}
