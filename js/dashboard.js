$(document).ready(function () {


    $.ajax({
        url: "php/ajax_usuario.php",
        type: "GET",
        success: function (response) {
            $("#username").html(response + ' <i class="fa-solid fa-chevron-down"></i>');
        },
        error: function () {
            console.log("Error al cargar usuario");
        }
    });

    $(document).ready(function () {

        let chartGenero = null;
        let chartNiveles = null;
        
        /* ========================================================
        NAVEGACIÓN SPA
        ======================================================== */
        $('.sidebar-nav li').on('click', function (e) {
            e.preventDefault();
        
            $('.sidebar-nav li').removeClass('active');
            $(this).addClass('active');
        
            let modulo = $(this).data('modulo');
        
            if (modulo === 'dashboard') {
                $('#moduloEstudiantes').hide();
                $('#moduloDashboard').fadeIn();
                cargarDatosDashboard();
            } 
            else if (modulo === 'estudiantes') {
                $('#moduloDashboard').hide();
                $('#moduloEstudiantes').fadeIn();
                cargarAlumnos();
            }
            else if (modulo === 'cursos') {
                $('#moduloDashboard').hide();
                $('#moduloEstudiantes').fadeIn();
                cargarCursos();
            }  
            else if (modulo === 'pagos') {
                $('#moduloDashboard').hide();
                $('#moduloReserva').fadeIn();
                cargarReservas();
            } 
            else {
                $('#moduloDashboard').hide();
                $('#moduloEstudiantes').hide();
                Swal.fire('Módulo en Desarrollo', '', 'info');
            }
        });
        
        /* ========================================================
        CARGAR DASHBOARD
        ======================================================== */
        function cargarDatosDashboard() {
            fetch('php/dashboard_datos.php')
                .then(res => res.json())
                .then(data => {
        
                    if (!data.exito) return;
        
                    let d = data.datos;
        
                    // KPIs
                    $('#kpiTotalAlumnos').text(d.kpis.totalAlumnos);
                    $('#kpiTotalAulas').text(d.kpis.totalAulas);
                    $('#kpiVacantesDisp').text(d.kpis.vacantesDisp);
        
                    // GENERO
                    let etiquetasGenero = d.graficos.genero.map(g => g.GENERO);
                    let datosGenero = d.graficos.genero.map(g => g.cantidad);
        
                    dibujarGraficoGenero(etiquetasGenero, datosGenero);
        
                    // NIVELES
                    let etiquetas = d.graficos.niveles.map(n => n.NIVEL);
                    let totales = d.graficos.niveles.map(n => n.totales);
                    let disponibles = d.graficos.niveles.map(n => n.disponibles);
        
                    dibujarGraficoNiveles(etiquetas, totales, disponibles);
                });
        }
        
        /* ========================================================
        GRÁFICOS
        ======================================================== */
        function dibujarGraficoGenero(etiquetas, datos) {
        
            let canvas = document.getElementById('graficoGenero');
            if (!canvas) return;
        
            let ctx = canvas.getContext('2d');
        
            if (chartGenero) chartGenero.destroy();
        
            chartGenero = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: etiquetas,
                    datasets: [{
                        data: datos,
                        backgroundColor: ['#3498DB', '#E74C3C', '#F1C40F']
                    }]
                }
            });
        }
        
        function dibujarGraficoNiveles(etiquetas, totales, disponibles) {
        
            let canvas = document.getElementById('graficoNiveles');
            if (!canvas) return;
        
            let ctx = canvas.getContext('2d');
        
            if (chartNiveles) chartNiveles.destroy();
        
            chartNiveles = new Chart(ctx, {
                type: 'bar',
                data: {
                    
                    labels: etiquetas,
                    datasets: [
                        {
                            label: 'Totales',
                            data: totales
                        },
                        {
                            label: 'Disponibles',
                            data: disponibles
                        }
                    ]
                }
            });
        }
        
        });

    // 1. ABRIR MODAL PARA NUEVO REGISTRO
    $('#btnNuevo').on('click', function () {
        $('#formAlumno')[0].reset();
        $('#opcion').val('1');
        $('#modalTitulo').text('Registrar Nuevo Alumno');
        $('#password').attr('required', true);
        $('#modalAlumno').fadeIn();
    });

    // 2. CERRAR MODAL
    $('.btn-cerrar-modal').on('click', function () {
        $('#modalAlumno').fadeOut();
    });

    // 3. ENVIAR FORMULARIO
    $('#formAlumno').submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: "php/crud_alumnos.php",
            type: "POST",
            dataType: "json",
            data: $(this).serialize(),

            success: function (respuesta) {

                if (respuesta.exito) {

                    $('#modalAlumno').fadeOut();

                    Swal.fire('¡Éxito!', respuesta.mensaje, 'success')
                        .then(() => {
                            location.reload();
                        });

                } else {

                    Swal.fire('Error', respuesta.mensaje, 'error');

                }
            }
        });
    });





    // 4. ELIMINAR
    $(document).on('click', '.fa-trash', function () {

        let fila = $(this).closest('tr');
        let idAlumno = fila.find('td:eq(0)').text();

        Swal.fire({
            title: '¿Eliminar Alumno?',
            text: "Se borrará permanentemente de la Base de Datos.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar'
        })
            .then((result) => {

                if (result.isConfirmed) {

                    $.ajax({
                        url: "php/crud_alumnos.php",
                        type: "POST",
                        dataType: "json",
                        data: { opcion: 3, id_alumno: idAlumno },

                        success: function (respuesta) {

                            if (respuesta.exito) {

                                fila.fadeOut(400, function () {
                                    $(this).remove();
                                });

                                Swal.fire('Eliminado', respuesta.mensaje, 'success');
                            }
                        }
                    });
                }
            });
    });

    // 5. EDITAR
    $(document).on('click', '.fa-pen-to-square', function () {

        let fila = $(this).closest('tr');

        let id = fila.find('td:eq(0)').text();
        let nombres = fila.find('td:eq(1)').text();
        let apellidos = fila.find('td:eq(2)').text();
        let dni = fila.find('td:eq(3)').text();

        let fecha = fila.find('td:eq(4)').text();
        let edad = fila.find('td:eq(5)').text();
        let genero = fila.find('td:eq(6)').text();
        let direccion = fila.find('td:eq(7)').text();
        let celular = fila.find('td:eq(8)').text();
        let correo = fila.find('td:eq(9)').text();
        let apoderado = fila.find('td:eq(10)').text();
        let cel_apoderado = fila.find('td:eq(11)').text();
        let username = fila.find('td:eq(12)').text();
        let estado = fila.find('td:eq(13) span').text();

        $('#id_alumno').val(id);
        $('#dni').val(dni);
        $('#nombres').val(nombres);
        $('#apellidos').val(apellidos);
        $('#fecha_nac').val(fecha);
        $('#edad').val(edad);
        $('#genero').val(genero);
        $('#direccion').val(direccion);
        $('#celular').val(celular);
        $('#correo').val(correo);
        $('#apoderado').val(apoderado);
        $('#cel_apoderado').val(cel_apoderado);
        $('#usernameAlumno').val(username);

        // ✅ CAMBIO 1
        if (estado == "Activo") {
            $('#estado').val('A');
        }
        else if (estado == "Inactivo") {
            $('#estado').val('I');
        }
        else {
            $('#estado').val('P');
        }

        $('#opcion').val('2');
        $('#modalTitulo').text('Editar Alumno');
        $('#password').removeAttr('required');

        $('#modalAlumno').fadeIn();

    });

    // CARGAR TABLA
    function cargarAlumnos() {

        $.ajax({

            url: "php/crud_alumnos.php",
            type: "POST",
            dataType: "json",
            data: { opcion: 4 },

            success: function (data) {

                let tbody = $('#tablaAlumnos');
                tbody.empty();

                $.each(data, function (index, alumno) {


                    let estadoTexto = '';
                    let estadoClase = '';

                    if (alumno.ESTADO == 'A') {
                        estadoTexto = 'Activo';
                        estadoClase = 'status-active';
                    }
                    else if (alumno.ESTADO == 'I') {
                        estadoTexto = 'Inactivo';
                        estadoClase = 'status-inactive';
                    }
                    else {
                        estadoTexto = 'En proceso';
                        estadoClase = 'status-pending';
                    }

                    let fila = `
                    <tr>
                    <td>${alumno.ID_ALUMNO}</td>
                    <td>${alumno.NOMBRES}</td>
                    <td>${alumno.APELLIDOS}</td>
                    <td>${alumno.DNI_ALUMNO}</td>

                    <td style="">${alumno.FECHA_NACIMIENTO}</td>
                    <td style="display:none">${alumno.EDAD}</td>
                    <td style="display:none">${alumno.GENERO}</td>
                    <td style="display:none">${alumno.DIRECCION}</td>
                    <td style="">${alumno.CELULAR}</td>
                    <td style="">${alumno.CORREO}</td>
                    <td style="display:none">${alumno.NOMBRE_APODERADO}</td>
                    <td style="display:none">${alumno.CELULAR_APODERADO}</td>
                    <td style="display:none">${alumno.USERNAME}</td>

                    <td>
                    <span class="status-badge ${estadoClase}">
                    ${estadoTexto}
                    </span>
                    </td>

                    <td class="action-icons">
                    <i class="fa-solid fa-pen-to-square"></i>
                    <i class="fa-solid fa-eye"></i>
                    <i class="fa-solid fa-trash"></i>
                    </td>

                    </tr>
                    `;

                    tbody.append(fila);

                });
            }
        });
    }




    cargarAlumnos();

    
// --- FUNCIONES AUXILIARES PARA DIBUJAR ---
function dibujarGraficoGenero(etiquetas, datos) {
    let ctx =
    document.getElementById('graficoGenero').getContext('2d');
    // Destruir gráfico anterior si existe (evita superposición al cambiar de pestaña)
    if (chartGenero) { chartGenero.destroy(); }
    chartGenero = new Chart(ctx, {
    type: 'doughnut', // Gráfico circular tipo "Dona"
    data: {
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        },
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
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        },
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

});