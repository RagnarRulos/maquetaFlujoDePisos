let timer;
let running = false;
let seconds = 0;
let minutes = 0;
let hours = 0;



const btnSeleccion1 = document.getElementById("btnSeleccion1");
const btnSeleccion2 = document.getElementById("btnSeleccion2");
const btnSeleccion3 = document.getElementById("btnSeleccion3");
const gridProcesos = document.getElementById("gridProcesos");
const inputOrdenProduccion = document.getElementById("inputOrdenProduccion").value;
const inputLote = document.getElementById("inputLote").value;
const btnBuscar = document.getElementById("btnBuscar");

const contPrincipal = document.getElementById("contPrincipal");
const cronometroDisplay = document.getElementById("cronometro");
const btnInicio = document.getElementById("btnInicio");
const btnNoConforme = document.getElementById("btnNoConforme");
const btnParoMaquina = document.getElementById("btnParoMaquina");
const opcionesNoConforme = document.getElementById("opcionesNoConforme");
const opcionesMaquina = document.getElementById("opcionesMaquina");
const opcionSeleccionada1 = document.getElementById("opcionSeleccionada1");
const opcionSeleccionada2 = document.getElementById("opcionSeleccionada2");



btnInicio.addEventListener("click", () => {
    if (!running) {
        startTimer();
        btnInicio.textContent = "Finalizar";
        btnInicio.style.backgroundColor = "Red";
        btnInicio.style.color ="white";
    } else {
        stopTimer();
        btnInicio.textContent = "Continuar";
        btnInicio.style.backgroundColor = "greenyellow";
        btnInicio.style.color ="Black";
    }
});

function startTimer() {
    running = true;
    timer = setInterval(updateTimer, 1000);
}

function stopTimer() {
    running = false;
    clearInterval(timer);
}

function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }

    const displayHours = hours < 10 ? "0" + hours : hours;
    const displayMinutes = minutes < 10 ? "0" + minutes : minutes;
    const displaySeconds = seconds < 10 ? "0" + seconds : seconds;

    cronometroDisplay.textContent = `${displayHours}:${displayMinutes}:${displaySeconds}`;
}



btnSeleccion1.addEventListener("click", () => {
    
    contPrincipal.style.display = "block"; // Mostrar el select
    gridProcesos.style.display = "none";
    document.getElementById("numProceso").innerText = "001";
    document.getElementById("lote").innerText = "1234";

});
btnSeleccion2.addEventListener("click", () => {
    
    contPrincipal.style.display = "block"; // Mostrar el select
    gridProcesos.style.display = "none";
    document.getElementById("numProceso").innerText = "002";
    document.getElementById("lote").innerText = "5678";

});



btnSeleccion3.addEventListener("click", () => {
    
    contPrincipal.style.display = "block"; // Mostrar el select
    gridProcesos.style.display = "none";
    document.getElementById("numProceso").innerText = "003";
    document.getElementById("lote").innerText = "91011";

});


btnNoConforme.addEventListener("click", () => {
    
    opcionesNoConforme.style.display = "block"; // Mostrar el select

});

opcionesNoConforme.addEventListener("change", () => {
    opcionSeleccionada1.textContent = "Inconformidad seleccionada: " + opcionesNoConforme.value;
    opcionSeleccionada1.style.display= "block";
    opcionesNoConforme.style.display = "none"; // Ocultar el select después de seleccionar una opción
});

btnParoMaquina.addEventListener("click", () => {
    
    opcionesMaquina.style.display = "block"; // Mostrar el select

});

opcionesMaquina.addEventListener("change", () => {
    opcionSeleccionada2.textContent = "Daño seleccionado: " + opcionesMaquina.value;
    opcionSeleccionada2.style.display="block";
    opcionesMaquina.style.display = "none"; // Ocultar el select después de seleccionar una opción
});


// Captura la fecha y hora del sistema
var fechaHoraActual = new Date();

// Formatea la fecha y hora en el formato deseado (puedes ajustar el orden según tus preferencias)
var fechaHoraFormateada = fechaHoraActual.toLocaleString();

// Imprime la fecha y hora en el HTML
document.getElementById('fecha').innerText = fechaHoraFormateada;



// Función para filtrar la tabla
function filtrarTabla() {
    var filtro = document.getElementById("filtro").value.toUpperCase();
    var tabla = document.getElementById("gridProcesos");
    var filas = tabla.getElementsByTagName("tr");

    for (var i = 0; i < filas.length; i++) {
        var celdas = filas[i].getElementsByTagName("td");
        var mostrarFila = false;
        for (var j = 0; j < celdas.length; j++) {
            var textoCelda = celdas[j].innerText.toUpperCase() || celdas[j].textContent.toUpperCase();
            if (textoCelda.indexOf(filtro) > -1) {
                mostrarFila = true;
                break;
            }
        }
        if (mostrarFila) {
            filas[i].style.display = "";
        } else {
            filas[i].style.display = "none";
        }
    }
}

// Agregar evento de input al campo de filtro
document.getElementById("filtro").addEventListener("input", filtrarTabla);








document.addEventListener("DOMContentLoaded", function() {
    var formularioBuscar = document.getElementById("formularioBuscar");
    var resultadoDiv = document.getElementById("resultado");

    // Evento submit del formulario
    formularioBuscar.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita el envío del formulario por defecto

        // Obtener valores del formulario
        var ordenProduccion = formularioBuscar.querySelector("#inputOrdenProduccion").value;
        var lote = formularioBuscar.querySelector("#inputLote").value;
        
        // Validación de ordenProduccion
        if (ordenProduccion !== "001" && ordenProduccion !== "002" && ordenProduccion !== "003") {
            // Mostrar mensaje de error en resultadoDiv
            resultadoDiv.textContent = "Error: La orden de producción debe ser 001, 002 o 003.";
            return; // Detener la ejecución del código
        }

        // Validación de lote
        if (lote !== "1234" && lote !== "5678" && lote !== "91011") {
            // Mostrar mensaje de error en resultadoDiv
            resultadoDiv.textContent = "Error: El lote debe ser 1234, 5678 o 91011.";
            return; // Detener la ejecución del código
        }
        
        // Mostrar los valores en el resultadoDiv
        resultadoDiv.textContent = "Orden de producción: " + ordenProduccion + ", Lote: " + lote;

        document.getElementById("numProceso").textContent = ordenProduccion;
        document.getElementById("lote").textContent = lote;
        contPrincipal.style.display = "block";
        gridProcesos.style.display = "none";
    });
});

