import { registro } from "./peticiones.js";

// Primero leemos el documento.
document.addEventListener("DOMContentLoaded", () => {
    // Aquí dentro, la validación
    const form = document.getElementById("formRegistro");

    const nombre = document.getElementById("nombre");
    const apellidos = document.getElementById("apellidos");
    const email = document.getElementById("email");
    const repetirEmail = document.getElementById("repetirEmail");
    const password = document.getElementById("password");
    const repetirPassword = document.getElementById("repetirPassword");
    const condiciones = document.getElementById("condiciones");
    const news = document.getElementById("news");

    // Función para hacer las validaciones. Lo mismo con cada validación.
    function validarNombre(nombre) {
        const errorNombre = document.getElementById("errorNombre");
        const valor = nombre.value;

        if (valor.length < 3) {
            nombre.classList.add("resaltado");
            errorNombre.innerText = "El nombre debe tener al menos 3 letras.";
            return false;
        } else if (valor[0] !== valor[0].toUpperCase()) {
            nombre.classList.add("resaltado");
            errorNombre.innerText = "El nombre debe empezar por mayúscula.";
            return false;
        }

        nombre.classList.remove("resaltado");
        errorNombre.innerText = "";
        return true;
    }

    function validarApellidos(apellidos) {
        const errorApellidos = document.getElementById("errorApellidos");
        const valor = apellidos.value;

        if (valor.length < 3) {
            apellidos.classList.add("resaltado");
            errorApellidos.innerText = "El apellido debe tener al menos 3 letras.";
            return false;
        } else if (valor[0] !== valor[0].toUpperCase()) {
            apellidos.classList.add("resaltado");
            errorApellidos.innerText = "El apellido debe empezar por mayúscula."
            return false;
        }

        apellidos.classList.remove("resaltado");
        errorApellidos.innerText = "";
        return true;
    }

    function validarEmail(email) {
        const errorEmail = document.getElementById("errorEmail");
        const valor = email.value;
        const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

        if (!regex.test(valor)) {
            email.classList.add("resaltado");
            errorEmail.innerText = "El email no es correcto.";
            return false;
        }

        email.classList.remove("resaltado");
        errorEmail.innerText = "";
        
        return true;
    }

    // Función para que el formulario no se envie cuando los campos son incorrectos, el global
    function validarFormularioCompleto() {
        let valido = true;

        if (!validarNombre(nombre)) valido = false;
        if (!validarApellidos(apellidos)) valido = false;
        if (!validarEmail(email)) valido = false;

        return valido;
    }
    
    // Función para enviar los datos al servidor.
    // Los repetir no son del server, así que no se ponen
    function enviarRegistro() {
        const body = {
            nombre: nombre.value,
            apellidos: apellidos.value,
            email: email.value,
            password: password.value,
            condiciones: condiciones.checked,
            news: news.checked
        };

        registro(body)
            .then(() => window.location.href = "index.html")
            .catch(() => errorRegistro.innerText = "No se ha podido realizar el registro.");
    }

    // Conectar eventos y envía el registro si todo sale bien
    // Usamos el evento blur, para salir del campo
    function inicializarEventos() {
        nombre.addEventListener("blur", () => validarNombre(nombre));
        apellidos.addEventListener("blur", () => validarApellidos(apellidos));
        email.addEventListener("blur", () => validarEmail(email));

        // Validación del botón
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            if (validarFormularioCompleto()) {
                errorRegistro.innerText = "";
                // Enviamos el registro si el formulario está correcto
                enviarRegistro();
            } else {
                errorRegistro.innerText = "Debes arreglar los errores del formulario."
            }
        })
    }

    // Conectamos el formulario con la lógica de lo anterior.
    // Aquí comprueba el blur, y si todo ha salido bien, nos lleva a enviarRegistro
    inicializarEventos();

})