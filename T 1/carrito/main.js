import Carrito from "./carrito.js";

let miCarrito;
const api = "http://localhost:8080/api/carrito";

document.addEventListener("DOMContentLoaded", function () {
    obtenerProductos();
});

function obtenerProductos() {
    fetch(api)
        .then(function (response) {
            return response.json;
        })
        .then(function (datos) {
            iniciarApp(datos);
        })
        .catch(function (error) {
            return console.log("Error al cargar los productos");
        });
}

function iniciarApp(datos) {
    miCarrito = new Carrito(datos.producto, datos.currenc);
}
