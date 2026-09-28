//Ejercicio 3
/**
scribe un programa en JavaScript, HTML y css para crear un párrafo y un
botón mediante el uso del DOM en Javascript
 */

document.addEventListener("DOMContentLoaded", function () {
    let parrafo = document.createElement("p");

    parrafo.textContent = "Parrafo creado con jscript";

    parrafo.style.color = "purple";

    let boton = document.createElement("button");

    boton.textContent ="Click me"

    boton.style.backgroundColor = "pink";
    boton.style.color = "white";

    boton.addEventListener("click", function(){
        alert("Boton precionado!")
    });

    document.body.appendChild(parrafo);
    document.body.appendChild(boton);
});
