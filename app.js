let arrayNombresParticipantes = [];
let nombresSorteados = [];

function agregarAmigo() {
    let nuevoNombre = document.getElementById("amigo").value.trim();

    if (nombreEsValido(nuevoNombre)) {
        if (!arrayNombresParticipantes.includes(nuevoNombre)) { // Verifica que no se repitan nombres en la lista
            arrayNombresParticipantes.push(nuevoNombre);
            document.getElementById("amigo").value = "";

            creaLi(nuevoNombre, "listaAmigos");

            document.getElementById("amigo").focus();
        } else {
            alert("Ese nombre ya ha sido agregado.");
        }
    } else {
        alert("Debe ingresar un nombre válido.");
    }
}

// Validar que el nombre contenga letras
function nombreEsValido(nombre) {
    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regexNombre.test(nombre);
}

// Función para sortear un amigo sin repetir hasta que todos hayan sido sorteados
function sortearAmigo() {
    let nombresDisponibles = arrayNombresParticipantes.filter(nombre => !nombresSorteados.includes(nombre));

    if (nombresDisponibles.length === 0) {
        alert("Todos los nombres ya han sido sorteados. Se reiniciará la lista.");
        nombresSorteados = []; // Resetear la lista de sorteados
        nombresDisponibles = [...arrayNombresParticipantes]; // Restaurar todos los nombres
        return;
    }

    if (nombresDisponibles.length > 0) {
        let indiceAleatorio = Math.floor(Math.random() * nombresDisponibles.length);
        let nombreSorteado = nombresDisponibles[indiceAleatorio];

        nombresSorteados.push(nombreSorteado); // Agregar a la lista de sorteados
        creaLi(nombreSorteado, "resultado");
    } else {
        alert("Debe haber al menos un nombre en el listado.");
    }
}

// Evento para presionar "Enter" y agregar nombres
document.getElementById("amigo").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        agregarAmigo();
    }
});

// Función para crear un <li> y agregarlo a la lista
function creaLi(item, stringListado) {
    let listado = document.getElementById(stringListado);
    if (listado) {
        let tagLi = document.createElement("li");
        tagLi.textContent = item;
        listado.appendChild(tagLi);
    } else {
        console.error(`Elemento con ID '${stringListado}' no encontrado`);
    }
}