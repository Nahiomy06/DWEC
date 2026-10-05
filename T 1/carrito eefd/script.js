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
