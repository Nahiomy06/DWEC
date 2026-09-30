//Ejercicio 3
/**
scribe un programa en JavaScript, HTML y css para crear un párrafo y un
botón mediante el uso del DOM en Javascript
 */

document.addEventListener("DOMContentLoaded", function () {
    const parrafo = document.createElement("p");

    parrafo.classList.add("parrafo")
    parrafo.textContent = "Ejercicio 3: Crear con jscript";

    const boton = document.createElement("button");
    
    boton.classList.add("btn-principal")
    boton.textContent = "Click me"

    boton.addEventListener("click", function(){
        alert("Boton precionado!")
    });

    document.body.appendChild(parrafo);
    document.body.appendChild(boton);
});
