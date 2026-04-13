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
        $('#username').val(username);

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

});