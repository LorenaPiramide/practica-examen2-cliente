import { obtenerLibrosDisponibles, obtenerLibrosPorUsuario } from "./peticiones.js";

document.addEventListener("DOMContentLoaded", () => {

    const usuario = JSON.parse(sessionStorage.getItem("usuario"));
    const btnLogout = document.getElementById("btnLogout");
    const listadoPrestamos = document.getElementById("listadoPrestamos")
    const listadosDisponibles = document.getElementById("listadoDisponibles");

    obtenerLibrosPorUsuario(usuario.id)
    .then(libros => {
        if (libros.length === 0) {
            listadoPrestamos.innerText = "No tienes ningún préstamo.";
            return;
        }

        const ul = document.createElement("ul");

        libros.forEach(libro => {
            const li = document.createElement("li");
            li.textContent = `${libro.titulo} - Autor: ${libro.autor}`;

            ul.appendChild(li);
        });

        listadoPrestamos.appendChild(li);
    })

    obtenerLibrosDisponibles()
    .then(libros => {
        // Miramos primero si hay libros
        if (libros.length === 0) {
            listadosDisponibles.innerText = "No hay libros disponibles";
            return;
        }

        // Si los hay, creamos la lista de libros
        const ul = document.createElement("ul");
        
        // Recorremos todos los libros
        libros.forEach(libro => {

            const li = document.createElement("li");
            li.textContent = `${libro.titulo} - Autor: ${libro.autor}`;
            
            ul.appendChild(li);
        });

        listadosDisponibles.appendChild(ul);
    })

    btnLogout.addEventListener("click", () => {
        sessionStorage.removeItem("usuario");
        window.location.href = "index.html";
    })

})