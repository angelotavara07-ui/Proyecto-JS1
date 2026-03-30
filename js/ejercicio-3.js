// Vamos a crear un objeto en javascript

const estudiante = {
    // Un mapa esta compuesto de clave y valor
    nombre : "Pepe",
    carrera : "Informática y Desarrollo de aplicaciones web",
    cicle : 3,
    //Vamos a crear MÉTODOS (Son las acciones = verbos)
    estudiar : function() {
        console.log("Pepito esta aprendiendo Javascript"); 
    }
}
// Acceder al objeto
    console.log(estudiante.nombre);
    estudiante.estudiar();


// Vamos a crear un constructor (SIEMPRE DEBE EMPEZAR CON MAYUSCULA)
// Constructor almacena atributos 
function Computadora(marca, procesador, ram){
    //Usamos atributos públicos usando THIS 
    this.marca = marca;
    this.procesador = procesador;
    this.ram = ram;
    //variable = derecha, termino de la función = izquierda, lo óptimo es hacer ambas iguales
}
//creamos el método (Acciones)
this.encender = function() {
    console.log("iniciamos el sistema" + this.marca );
}

this.aumentarRam = function() {
    return ram + "GB";
}
// El operador new significa instancia, crea una instancia o copia a partir del modelo
const PClab1= new Computadora("HP", "Corel7", "32");
const PClab2= new Computadora("Asus", "Corel5", "16");
const PClab3= new Computadora("HP", "Corel5", "8");
const PClab4= new Computadora("Asus", "Corel7", "32");

console.log(PClab1.marca);
console.log(PClab1.procesador);
console.log(PClab1.ram);

const mensaje = "Tipos de datos JavaScript";
//funciones preestablecidas de javascript
console.log(mensaje.length); //Cuenta los caracteres
console.log(mensaje.trim()); //Solo un espacio
console.log(mensaje.toUpperCase()); //Convierte a mayuscula
console.log(mensaje.includes("es")); //Quiero buscar si "es" esta dentro de mi mensaje //Usado para condicionales "falso/verdadero"

const lenguajes = ["HTML", "CSS", "PHP", "JAVASCRIPT"] //"[]" = Arreglo 

lenguajes.push ("JAVA"); //Añade al final
lenguajes.pop(); //Elimina el último dato registrado

lenguajes.unshift ("JAVA"); //Añade al inicio
lenguajes.shift(); //Elimina el primer dato registrado

console.log(lenguajes.join("-"));