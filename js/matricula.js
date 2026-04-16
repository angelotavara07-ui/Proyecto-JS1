$(document).ready(function () {


    // ABRIR MODAL
    $('#btnNuevaMatricula').on('click', function () {

        $('#formMatricula')[0].reset();

        $('#opcionMatricula').val('1');

        $('#modalTituloMatricula').text('Registrar Matrícula');

        $('#modalMatricula').fadeIn();

        cargarAlumnos();
        cargarCursos();

    });


    // CERRAR MODAL
    $('.btn-cerrar-modal-matricula').on('click', function () {

        $('#modalMatricula').fadeOut();

    });


    // ENVIAR FORMULARIO
    $('#formMatricula').submit(function (e) {

        e.preventDefault();

        $.ajax({

            url: "php/crud_matricula.php",
            type: "POST",
            dataType: "json",
            data: $(this).serialize(),

            success: function (respuesta) {

                if (respuesta.exito) {

                    Swal.fire('Éxito', respuesta.mensaje, 'success');

                    $('#modalMatricula').fadeOut();

                    cargarMatricula();

                }

            }

        });

    });


    // CARGAR TABLA
    function cargarMatricula() {

        $.ajax({

            url: "php/crud_matricula.php",
            type: "POST",
            dataType: "json",
            data: { opcion: 4 },

            success: function (data) {

                let tbody = $('#tablaMatricula');

                tbody.empty();

                $.each(data, function (index, matricula) {

                    let fila = `
<tr>

<td>${matricula.ID_MATRICULA}</td>
<td>${matricula.ALUMNO}</td>
<td>${matricula.CURSO}</td>
<td>${matricula.FECHA_INSCRIPCION}</td>

<td class="action-icons">
<i class="fa-solid fa-trash"></i>
</td>

</tr>
`;

                    tbody.append(fila);

                });

            }

        });

    }


    // CARGAR ALUMNOS
    function cargarAlumnos() {

        $.ajax({

            url: "php/crud_matricula.php",
            type: "POST",
            data: { opcion: 5 },

            success: function (data) {

                $('#id_alumno').html(data);

            }

        });

    }


    // CARGAR CURSOS
    function cargarCursos() {

        $.ajax({

            url: "php/crud_matricula.php",
            type: "POST",
            data: { opcion: 6 },

            success: function (data) {

                $('#id_curso').html(data);

            }

        });

    }


    // ELIMINAR
    $(document).on('click', '#tablaMatricula .fa-trash', function () {

        let fila = $(this).closest('tr');

        let id = fila.find('td:eq(0)').text();

        $.ajax({

            url: "php/crud_matricula.php",
            type: "POST",
            dataType: "json",
            data: { opcion: 3, id_matricula: id },

            success: function (res) {

                if (res.exito) {

                    fila.remove();

                }

            }

        });

    });


    cargarMatricula();

});