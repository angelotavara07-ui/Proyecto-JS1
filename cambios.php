<php>

/* ========================================================
 NAVEGACIÓN DEL MENÚ LATERAL (SPA)
======================================================== */
 $('.sidebar-nav li').on('click', function (e) {
 e.preventDefault();

 // Quitar 'active' de todos y ponérselo al actual
 $('.sidebar-nav li').removeClass('active');
 $(this).addClass('active');

 // Lógica para mostrar/ocultar módulos basada en el texto del menú
let menuTexto = $(this).text().trim(); // Ej: "Dashboard" o "Estudiantes"
if(menuTexto === 'Dashboard') {
    $('#moduloEstudiantes').hide();
    $('#moduloDashboard').fadeIn();
    cargarDatosDashboard(); // Función que crearemos abajo
    }
    else if(menuTexto === 'Estudiantes') {
    $('#moduloDashboard').hide();
    $('#moduloEstudiantes').fadeIn();
    cargarAlumnos(); // Tu función existente que carga la tabla
    }
    else {
    // Para menús aún no construidos (Cursos, Pagos, etc.)
    $('#moduloDashboard').hide();
    $('#moduloEstudiantes').hide();
    Swal.fire('Módulo en Desarrollo', 'Esta sección estará disponible pronto.', 'info');
    }
    });



// --- FUNCIONES AUXILIARES PARA DIBUJAR ---
function dibujarGraficoGenero(etiquetas, datos) {
let ctx =
document.getElementById('graficoGenero').getContext('2d');
// Destruir gráfico anterior si existe (evita superposición al cambiar de pestaña)
if (chartGenero) { chartGenero.destroy(); }
chartGenero = new Chart(ctx, {
type: 'doughnut', // Gráfico circular tipo "Dona"
data: {
labels: etiquetas,
datasets: [{
data: datos,
backgroundColor: ['#3498DB', '#E74C3C', '#F1C40F'],

// Colores corporativos

borderWidth: 2,
hoverOffset: 4
}]
},
options: {
    responsive: true,
maintainAspectRatio: false, // Permite que se adapte a nuestro CSS

plugins: {
legend: { position: 'bottom' }
}
}
});
}
function dibujarGraficoNiveles(etiquetas, totales, disponibles) {
let ctx =
document.getElementById('graficoNiveles').getContext('2d');
if (chartNiveles) { chartNiveles.destroy(); }
chartNiveles = new Chart(ctx, {
type: 'bar', // Gráfico de barras
data: {
labels: etiquetas,
datasets: [
{
label: 'Vacantes Totales',
data: totales,
backgroundColor: '#95A5A6', // Gris
borderRadius: 4
},
{
label: 'Vacantes Disponibles',
data: disponibles,
backgroundColor: '#2ECC71', // Verde
borderRadius: 4
}
]
},
options: {
responsive: true,
maintainAspectRatio: false,
scales: {
y: { beginAtZero: true }
}
}
});
}
</php>