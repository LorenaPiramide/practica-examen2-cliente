const URL_SERVER = `http://100.49.134.235:3000/`;

export function login(email) {
    return fetch(`${URL_SERVER}usuarios?email=${encodeURIComponent(email)}`)
        .then(res => {
            // console.log(res.body)
            // const resJson = res.json();
            // // if (resJson.length() < 1) throw new Error("Error en el login.");
            // if (Array.isArray(res.body)) {
            //     console.log("The array is empty");
            // }
            // console.log(res);
            if (!res.ok) throw new Error("Error en el login.");
            return res.json();
        })
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

export function obtenerLibrosPorEmail(id_user) {
    return fetch(`${URL_SERVER}libros?id_prestamo=${id_user}`)
        .then(res => {
            if (!res.ok) throw new Error("Error al obtener los libros del usuario.");
            return res.json();
        })
}