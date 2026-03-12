// Pedir la nota al estudiante
let nota = prompt("Ingresa tu nota final (0 - 20):");

// Convertir a número entero
nota = parseInt(nota);

// Variable para el mensaje
let mensaje;

// Evaluar la nota
if (nota >= 13) {
    mensaje = "¡Aprobado!";
    console.log("¡Aprobado!");
} else {
    mensaje = "Desaprobado";
    console.log("Desaprobado");
}

// Mostrar también en la página HTML
document.getElementById("resultado").textContent = mensaje;