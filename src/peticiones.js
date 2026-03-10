const URL_SERVER = `http://100.49.134.235:3000/`;
const milisegundosDia = 24 * 60 * 60 * 1000;

export function login(email, password) {
    return fetch(`${URL_SERVER}usuarios?email=${encodeURIComponent(email)}`)
        .then(res => {
            if (!res.ok) throw new Error("Error de conexión.");
            return res.json();
        })
        .then(datos => {
            if (!Array.isArray(datos) || datos.length === 0) {
                throw new Error("Usuario no encontrado.");
            }
            const dato = datos[0];
            if (dato.password !== password) {
                throw new Error("Contraseña incorrecta.");
            }
            return dato;
        });
}

export function registro(usuario) {
    return fetch(`${URL_SERVER}usuarios`, {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
    }).then(res => {
        if (!res.ok) throw new Error("Error en el registro.");
        return res.json();
    })
}

export function obtenerLibrosDisponibles() {
    return fetch(`${URL_SERVER}libros?id_prestamo=0`,)
        .then(res => {
            if (!res.ok) throw new Error("Error al obtener los libros disponibles.");
            return res.json();
        })
}

export function obtenerLibrosPorUsuario(id_user) {
    return fetch(`${URL_SERVER}libros?id_prestamo=${id_user}`)
        .then(res => {
            if (!res.ok) throw new Error("Error al obtener los libros del usuario.");
            return res.json();
        })
}

export function prestarLibro(id_user, id_libro) {
    return fetch(`${URL_SERVER}libros/${id_libro}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id_prestamo: id_user,
            fecha_devolucion: new Date(Date.now() + 14 * milisegundosDia).toISOString().split('T')[0]
        })
    }).then(res => {
        if (!res.ok) throw new Error("Error al prestar el libro.");
        return res.json();
    })
}

export function devolverLibro(id_libro) {
    return fetch(`${URL_SERVER}libros/${id_libro}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id_prestamo: "0",
            fecha_devolucion: ""
        })
    }).then(res => {
        if (!res.ok) throw new Error("Error en la devolución");
        return res.json();
    })
}