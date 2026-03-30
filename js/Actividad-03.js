function EquipoSoporte(tipo, marca, estado, idinventario, fechaingreso){

    this.tipo = tipo;
    this.marca = marca;
    this.estado = estado;
    this.idinventario = idinventario;
    this.fechaingreso = fechaingreso;

    let codigoInventario = Math.floor(Math.random()*10000);

    
    this.reporte = function(){
        console.log("----- REPORTE DEL EQUIPO -----");
        console.log("Tipo: " + this.tipo);
        console.log("Marca: " + this.marca);
        console.log("Estado: " + this.estado);
        console.log("ID Inventario: " + this.idinventario);
        console.log("Fecha de ingreso: " + this.fechaingreso);
        console.log("Código Inventario: " + codigoInventario);
    }
}

const equipo1 = new EquipoSoporte("Proyector","Epson","Operativo","INV001","2026-03-16");

equipo1.reporte();