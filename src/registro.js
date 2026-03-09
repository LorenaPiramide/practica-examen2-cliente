import { registro } from "./peticiones.js";

// Primero leemos el documento.
document.addEventListener("DOMContentLoaded", () => {
    // Aquí dentro, la validación

    // Seleccionamos el formulario con el input
    function seleccionarElementos() {
        // TODO: recordamos seleccionar el formulario entero. Lo usuaremos para el blur
        const form = document.getElementById("formRegistro");

        // TODO: Seleccionamos los demás campos
        const nombre = document.getElementById("nombre");
        const apellidos = document.getElementById("apellidos");
        const email = document.getElementById("email");
        const repetirEmail = document.getElementById("repetirEmail");
        const password = document.getElementById("password");
        const repetirPassword = document.getElementById("repetirPassword");
        const condiciones = document.getElementById("condiciones");
        const news = document.getElementById("news");
    }

    // Función para hacer las validaciones. Lo mismo con cada validación.
    function validarNombre(nombre) {
        const errorNombre = document.getElementById("errorNombre");
        const valor = nombre.value;

        if (nombre.length < 3) {
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

    // Función para validar todo el formulario. Se hace con todos los campos. 
    // En las repeticiones, se pasa el elementos.normal, elementos.repetir
    function validarFormularioCompleto(elementos) {
        let valido = true;

        if (!validarNombre(elementos.nombre)) valido = false;

        return valido;
    }
    
    // Función para enviar los datos al servidor.
    // Los repetir no son del server, así que no se ponen
    function enviarRegistro(elementos) {
        const body = {
            nombre: elementos.nombre.value,
            apellidos: elementos.apellidos.value,
            email: elementos.email.value,
            password: elementos.password.value,
            condiciones: elementos.condiciones.checked,
            news: elementos.news.checked
        };

        registro(body)
            .then(() => window.location.href = "index.html")
            .catch(() => errorRegistro.innerText = "No se ha podido realizar el registro.");
    }

    // Conectar eventos y envía el registro si todo sale bien
    // Usamos el evento blur, para salir del campo
    function inicializarEventos(elementos) {
        elementos.nombre.addEventListener("blur", () => validarNombre(elementos.nombre));

        // Validación del botón
        elementos.form.addEventListener("submit", (e) => {
            e.preventDefault();

            if (validarFormularioCompleto(elementos)) {
                elementos.errorRegistro.innerText = "";
                // Enviamos el registro si el formulario está correcto
                enviarRegistro(elementos);
            } else {
                elementos.errorRegistro.innerText = "Debes arreglar los errores del formulario."
            }
        })
    }

    // Busca los elementos del html que vamos a usar
    const elementos = seleccionarElementos();
    // Comprueba si el elemento formulario existe, creo que no hace falta
    if (!elementos.form) return;

    // Conectamos el formulario con la lógica de lo anterior.
    // Aquí comprueba el blur, y si todo ha salido bien, nos lleva a enviarRegistro
    inicializarEventos(elementos);

})