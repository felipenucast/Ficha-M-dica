
// Array global
let personas = [];

// Referencias
const form = document.getElementById('fichaMedica');
const btnLimpiar = document.getElementById('btnLimpiar');
const btnCerrar = document.getElementById('btnCerrar');

// Función para mostrar todos los registros en consola, esta implementación se hizo para pruebas
function mostrarRegistros() {
    console.clear();
    console.table(personas);
}

// Evento al enviar formulario
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const rut = form.rut.value.trim();
    const nombre = form.nombre.value.trim();
    const apellidoPaterno = form.ApellidoPaterno.value.trim();
    const apellidoMaterno = form.ApellidoMaterno.value.trim();
    const direccion = form.direccion.value.trim();
    const ciudad = form.ciudad.value.trim();
    const telefono = form.telefono.value.trim();
    const email = form.email.value.trim();
    const fechaNacimiento = form.fechaNacimiento.value.trim();
    const estadoCivil = form.estadoCivil.value.trim();

    // Validar campos obligatorios
    if (!rut || !nombre || !apellidoPaterno || !apellidoMaterno || !direccion || !ciudad || !telefono || !email || !fechaNacimiento || !estadoCivil) {
        alert("⚠️ Todos los campos son obligatorios.");
        return;
    }

    // Verificar si ya existe el RUT
    const existe = personas.some(p => p.rut === rut);
    if (existe) {
        if (!confirm("Este RUT ya existe. ¿Desea sobrescribir el registro?")) {
            return;
        } else {
            // Sobrescribir el registro existente
            personas = personas.map(p => p.rut === rut ? { rut, nombre, apellidoPaterno, apellidoMaterno, direccion, ciudad, telefono, email, fechaNacimiento, estadoCivil } : p);
            alert("Registro sobrescrito ✅");
            mostrarRegistros();
            form.reset();
            return;
        }
    }

    // Guardar nuevo registro
    personas.push({ rut, nombre, apellidoPaterno, apellidoMaterno, direccion, ciudad, telefono, email, fechaNacimiento, estadoCivil });
    alert("Registro guardado ✅");

    actualizarTabla();
    mostrarRegistros();

    // Mostrar todos los registros en consola
    mostrarRegistros();

    form.reset();
});

// Botón limpiar
btnLimpiar.addEventListener('click', function () {
    form.reset();
});

// Botón cerrar
btnCerrar.addEventListener('click', function () {
    if (confirm("¿Seguro que quieres cerrar el formulario?")) {
        window.close();
    }
});

// Función para actualizar la tabla     
function actualizarTabla() {
    const tbody = document.getElementById("tablaRegistros").getElementsByTagName("tbody")[0];
    tbody.innerHTML = ""; // Limpiar tabla

    personas.forEach(persona => {
        const fila = document.createElement("tr");
        for (let key in persona) {
            const celda = document.createElement("td");
            celda.textContent = persona[key];
            fila.appendChild(celda);
        }
        tbody.appendChild(fila);
    });
}

const inputBuscar = document.getElementById("buscarApellido");
const btnBuscar = document.getElementById("btnBuscar");

btnBuscar.addEventListener("click", function() {
    const texto = inputBuscar.value.trim().toLowerCase();
    if (!texto) {
        actualizarTabla(); 
        return;
    }

    const resultados = personas.filter(p => p.apellidoPaterno.toLowerCase().includes(texto));
    actualizarTabla(resultados);
});

// Modificar la función actualizarTabla para aceptar array
function actualizarTabla(lista = personas) {
    const tbody = document.getElementById("tablaRegistros").getElementsByTagName("tbody")[0];
    tbody.innerHTML = ""; // limpiar tabla

    lista.forEach(persona => {
        const fila = document.createElement("tr");
        for (let key in persona) {
            const celda = document.createElement("td");
            celda.textContent = persona[key];
            fila.appendChild(celda);
        }
        tbody.appendChild(fila);
    });
}
