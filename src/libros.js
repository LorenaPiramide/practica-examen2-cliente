import { obtenerLibrosDisponibles, obtenerLibrosPorUsuario, prestarLibro, devolverLibro } from "./peticiones.js";

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
            li.textContent = `${libro.titulo} - Autor: ${libro.autor} - Fecha de devolución: ${libro.fecha_devolucion}`;

            const btnDevolver = document.createElement("button");
            btnDevolver.textContent = "Devolver";

            btnDevolver.addEventListener("click", () => {
                devolverLibro(libro.id)
                .then(() => window.location.href = "libros.html");
            })

            li.appendChild(btnDevolver);

            ul.appendChild(li);
        });

        listadoPrestamos.appendChild(ul);
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
            
            const btnPrestar = document.createElement("button");
            btnPrestar.textContent = "Prestar";

            btnPrestar.addEventListener("click", () => {
                prestarLibro(usuario.id, libro.id)
                .then(() => window.location.href = "libros.html");
            })

            li.appendChild(btnPrestar);

            ul.appendChild(li);
        });

        listadosDisponibles.appendChild(ul);
    })

    btnLogout.addEventListener("click", () => {
        sessionStorage.removeItem("usuario");
        window.location.href = "index.html";
    })

})