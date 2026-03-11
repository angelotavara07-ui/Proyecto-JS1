// 1. Primer paso: Capturamos elementos del DOM (Fase 1: Fase de entrada: Declaración de variables o constantes y preguntas al sistema)
//DOM: Document Object Model (Cualquier objecto en el html)

const nombreusuario = document.getElementById('nombreusuario');
const btnSaludar = document.getElementById('btnSaludar');
const mensaje= document.getElementById('mensaje');

// 2. Segundo paso: Creamos la función (FASE 2: FASE DE PROCESO: Se plantea la lógica, las operaciones, uso de funciones, while, do while, for, foreach, etc)

function registrar (){
    //Capturando el dato desde el DOM
    //creamos la variable nombre con el valor almacenado de la constante nombreusuario
    let nombre = nombreusuario.value;
    //mostramos en consola
    console.log("El nombre registrado en consola es: " + nombre);

// 3. Mostrar todo en el DOM (Fase 3: FASE DE SALIDA: Donde se muestra en pantalla o consola el resultado de todas las fases previas. Ejemplo: Hola bienvenido a mi pagina)
    mensaje.textContent= "¡Hola, " + nombre + " Bienvenido al curso";

}