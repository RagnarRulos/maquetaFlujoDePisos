//asignar tareas


document.addEventListener('DOMContentLoaded', function () {
    const calendar = document.getElementById('calendar');
    const details = document.getElementById('details');
    const today = new Date();
    let selectedDate = today;
    let startDate = null;
    let endDate = null;
    const peopleTasks = {}; // Almacena las personas y tareas asignadas por fecha

    function generateCalendar(year, month) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayIndex = new Date(year, month, 1).getDay();
        
        calendar.innerHTML = '';

        for (let i = 0; i < firstDayIndex; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('day');
            calendar.appendChild(emptyDay);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.classList.add('day');
            day.textContent = i;

            day.addEventListener('click', () => {
                selectedDate = new Date(year, month, i);
                showDetails();
            });

            calendar.appendChild(day);
        }
    }

    function showDetails() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        details.innerHTML = `<h2>${selectedDate.toLocaleDateString('es-ES', options)}</h2>`;
        
        const selectedDateString = selectedDate.toISOString().split('T')[0];
        const tasks = peopleTasks[selectedDateString];

        if (tasks) {
            details.innerHTML += '<h3>Tareas:</h3>';
            tasks.forEach(task => {
                details.innerHTML += `<p>${task.person}: ${task.task}</p>`;
            });
        } else {
            details.innerHTML += '<p>No hay tareas asignadas para esta fecha.</p>';
        }
    }

    function selectRange(startDate, endDate, person, task) {
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const dateString = currentDate.toISOString().split('T')[0];
            if (!peopleTasks[dateString]) {
                peopleTasks[dateString] = [];
            }
            peopleTasks[dateString].push({ person, task });
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }

    generateCalendar(today.getFullYear(), today.getMonth());
    showDetails();

    // Ejemplo de cómo usar la función selectRange
    const button = document.createElement('button');
    button.textContent = 'Asignar Tarea';
    button.addEventListener('click', () => {
        const person = prompt('Ingrese el nombre de la persona:');
        const task = prompt('Ingrese la tarea:');
        if (person && task && startDate && endDate) {
            selectRange(startDate, endDate, person, task);
            showDetails();
        }
    });
    details.appendChild(button);

    // Función para seleccionar un rango de fechas
    calendar.addEventListener('click', (event) => {
        const clickedDate = new Date(selectedDate);
        clickedDate.setDate(parseInt(event.target.textContent));

        if (!startDate || clickedDate < startDate || (endDate && clickedDate > endDate)) {
            startDate = new Date(clickedDate);
            endDate = null;
        } else if (!endDate || clickedDate > endDate) {
            endDate = new Date(clickedDate);
        } else if (clickedDate >= startDate && clickedDate <= endDate) {
            endDate = null;
        }

        showDetails();
    });
});


// Tabs grid de programacion

function openTab(tabName) {
    var i, tabcontent, tablinks;

    // Oculta todos los contenidos de las pestañas y el calendario
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    document.getElementById('calendar').style.display = 'none';

    // Desactiva la clase "active" de todos los botones de pestaña
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Muestra el contenido de la pestaña seleccionada y activa su botón
    if (tabName === 'Operario') {
        document.getElementById('calendar').style.display = 'block';
        document.getElementById('Operario').style.display = 'block';
        document.getElementById('details').style.display = 'block';

    } else {
        document.getElementById(tabName).style.display = "block";
        event.currentTarget.className += " active"; // Agregamos la clase 'active' al botón clickeado
        document.getElementById('details').style.display = 'none';
    }

    // Agregar la clase "active" al contenido de la pestaña seleccionada
    document.getElementById(tabName).classList.add("active");
}



// Captura la fecha y hora del sistema
var fechaHoraActual = new Date();

// Formatea la fecha y hora en el formato deseado (puedes ajustar el orden según tus preferencias)
var fechaHoraFormateada = fechaHoraActual.toLocaleString();

// Imprime la fecha y hora en el HTML
document.getElementById('fechaActual').innerText = fechaHoraFormateada;


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

//botón imprimir

function imprimirGrid() {
    var tabActiva = document.querySelector('.tabcontent.active');
    if (tabActiva) {
        var grid = tabActiva.querySelector('.table');
        var ventana = window.open('', '', 'height=500,width=500');
        ventana.document.write('<html><head><title>Imprimir</title>');
        ventana.document.write('</head><body>');
        ventana.document.write(grid.outerHTML);
        ventana.document.write('</body></html>');
        ventana.document.close();
        ventana.print();
    } else {
        alert("No hay ninguna pestaña abierta para imprimir.");
    }
}