//login

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe

    // Obtener los valores del formulario
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Aquí puedes realizar la autenticación del usuario, por ejemplo, comparando los valores con una base de datos o una API

    // Ejemplo de autenticación simple (solo para propósitos de demostración)
    if (username === "AMORENO" && password === "123456") {
        // Autenticación exitosa
        document.getElementById("loginMessage").innerText = "Inicio de sesión exitoso";
        // Redirigir al usuario a otra página
        window.location.href = "principal.html";
    

        // Construir la URL con la cadena de consulta
        var url = "principal.html" + encodeURIComponent(nombreUsuario) + encodeURIComponent(proceso);

        // Redirigir a la nueva URL


    } else {
        // Autenticación fallida
        document.getElementById("loginMessage").innerText = "Usuario o contraseña incorrectos";
    }
});
