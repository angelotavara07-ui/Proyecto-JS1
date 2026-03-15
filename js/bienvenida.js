let nombre = prompt("Por favor, ingresa tu nombre:");
let edad = prompt("Por favor, ingresa tu edad:");

alert("El usuario " + nombre + " Tiene " + edad + " años.");

document.getElementById("resultado").textContent =
"El usuario " + nombre + " tiene " + edad + " años.";

console.log("El usuario " + nombre + " tiene " + edad + " años.");