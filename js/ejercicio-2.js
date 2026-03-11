//1. PASO 1: Declarar un Array con 5 lenguajes de programación

// int, string, let: Tipos de datos simples
// arrays: Tipos de datos compuestos (Puede almacenar muchos valores)
// 4 indices (Empieza de 0) 5 elementos
const lenguajes =[
    "JavaScript", "python", "Java", "PHP", "C#"
];
//PASO 2: Capturamos los elementos de DOM

const lista = document.getElementById ("lista");

let elementos = ""; //inicializar variable

// PASO 3: Usamos el bucle for para recorrer un array
    // i es una variable      //length = longitud/contenido de la variable "lenguajes"
for (let i = 0; i < lenguajes.length; i++){
   //inicializador  //finalizador   //incremento
//inicializador se empieza de cero tomando en cuenta los indices
//el finalizador for dara vueltas hasta que 
    if (lenguajes[i] === "JavaScript" ) {
        alert("JavaScript sirve para el FrontEnd y para el BackEnd");
    
    }   
        //1 igual es asignación, 2 iguales es igualdad, 3 iguales es Igualdad Estricta.
    //lista.innerHTML += "<li>" + lenguajes[i] + "</li>";
    elementos += "<li>" + lenguajes[i] + "</li>";

}


lista.innerHTML = elementos;
//PASO 4: Acumulamos cada lenguaje dentro de las etiquetas li

        //acumulador          
