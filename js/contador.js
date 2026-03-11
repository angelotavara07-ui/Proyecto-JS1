// 1. Intentamos recuperar el conteo previo guardado en el navegador
let contador = localStorage.getItem("contador");
// 2. Usamos un condicional ternario (un if/else resumido):
// Si 'contador' tiene datos, lo convertimos a número entero (parseInt).
//Si está vacío, inicia en 0.
contador = contador ? parseInt(contador) : 0;
// 3. Capturamos el elemento usando su ID.
// Usamos 'const' porque la "caja" HTML no cambiará, solo cambiará el texto dentro de ella.
const conteo = document.getElementById("contador");
// 4. Mostramos el valor inicial en la pantalla
conteo.textContent = contador;
// 5. Esta función recibe un "valor" (+1 o -1) y actualiza todo
function actualizarConteo(valor) {
// Sumamos o restamos el valor al contador actual
contador += valor;
// Guardamos el nuevo valor en la memoria del navegador (LocalStorage)
localStorage.setItem("contador", contador);
// Actualizamos el número visible en la página web
conteo.textContent = contador;
}
// 7. Función para el botón REDUCIR
function reducir() {
actualizarConteo(-1);
}
function aumentar() {
actualizarConteo(+1);
}
// 8. Función para el botón RESET
function reset() {
contador = 0; // Devolvemos la variable a cero
localStorage.setItem("contador", contador); // Sobrescribimos la memoria
conteo.textContent = contador; // Actualizamos la pantalla a cero
}
