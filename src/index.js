import { login } from "./peticiones";
import { obtenerLibrosDisponibles } from "./peticiones";

document.addEventListener("DOMContentLoaded", () => {
    // Guardamos el error del login en una constante.
    const error = document.getElementById("errorLogin");
    const btnLogin = document.getElementById("btnLogin");

    // Del botón login que hemos guardado, le decimos que hacer con el evento click
    btnLogin.addEventListener("click", () => {
        const email = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (!email || !password) {
            error.textContent = "Debes completar todos los campos.";
            return;
        }

        // Si el usuario y password son correctos, guarda el usuario en sessionstorage
        login(email, password)
            .then(usuario => {
                sessionStorage.setItem("usuario", JSON.stringify(usuario));
                window.location.href = "libros.html";
            })
    })

    const listadoDisponibles = document.getElementById("listadoDisponibles");

    obtenerLibrosDisponibles()
        .then(libros => {
            // Limpiamos los libros disponibles por si había otros antes.
            listadoDisponibles.innerHTML = "";

            if (libros.length === 0) {
                listadoDisponibles.textContent = "No hay libros disponibles.";
                return;
            }

            // Creamos la ul
            const ul = document.createElement("ul");

            libros.forEach(libro => {
                const li = document.createElement("li");

                // Lo que queremos en el li
                li.textContent = `${libro.titulo} - Autor: ${libro.autor}`;
                // Dentro de ul va li
                ul.appendChild(li);
            });

            // Añadimos la ul al listado para que aparezca en el div
            listadoDisponibles.appendChild(ul);

        })

})