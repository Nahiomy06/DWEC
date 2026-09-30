document.addEventListener('DOMContentLoaded', function(){
    const form = document.querySelector('form');

    form.addEventListener('submit', function(){
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const edad = Number(document.getElementById('edad').value);
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;


        if(!validarEmail(email)){
            alert('introducir un email valido');
            return;
        };

        if(!validarTel(telefono)){
            alert('introducir un numero de telefono valido')
            return;
        };

        if (nombre.length < 3){
            alert('introducir un nombre con al menos 3 letras');
            return;
        };

        if (edad < 0 || edad > 120){
            alert('introducir una edad entre 0 y 120');
            return;
        };

        form.submit();
    })

});

function validarEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}

function validarTel(telefono){
    const telRegex = /^[0-9]{9}$/;
    return telRegex.test(telefono)
}