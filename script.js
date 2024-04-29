let timer;
let running = false;
let seconds = 0;
let minutes = 0;
let hours = 0;

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