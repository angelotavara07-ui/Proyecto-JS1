let nota = prompt("Ingresa tu nota final (0 - 20):");


nota = parseInt(nota);


let mensaje;


if (nota >= 13) {
    mensaje = "¡Aprobado!";
    console.log("¡Aprobado!");
} else {
    mensaje = "Desaprobado";
    console.log("Desaprobado");
}


document.getElementById("resultado").textContent = mensaje;