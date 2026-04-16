<?php

$host = 'localhost';
$db = 'MATRICULA';
$user = 'root';
$pass = '';

try {

$pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Recibir acción
$opcion = $_POST['opcion'] ?? '';

switch ($opcion) {

case '1': // CREAR MATRICULA

$sql = "INSERT INTO MATRICULA (ID_ALUMNO, ID_CURSO)
        VALUES (?, ?)";

$stmt = $pdo->prepare($sql);

$stmt->execute([
    $_POST['id_alumno'],
    $_POST['id_curso']
]);

echo json_encode([
    "exito" => true,
    "mensaje" => "Matrícula registrada correctamente."
]);

break;


case '2': // EDITAR MATRICULA

$sql = "UPDATE MATRICULA 
        SET ID_ALUMNO = ?, 
            ID_CURSO = ?
        WHERE ID_MATRICULA = ?";

$stmt = $pdo->prepare($sql);

$stmt->execute([
    $_POST['id_alumno'],
    $_POST['id_curso'],
    $_POST['id_matricula']
]);

echo json_encode([
    "exito" => true,
    "mensaje" => "Matrícula actualizada correctamente."
]);

break;


case '3': // ELIMINAR MATRICULA

$sql = "DELETE FROM MATRICULA WHERE ID_MATRICULA = ?";

$stmt = $pdo->prepare($sql);
$stmt->execute([$_POST['id_matricula']]);

echo json_encode([
    "exito" => true,
    "mensaje" => "Matrícula eliminada."
]);

break;


case '4': // LISTAR MATRICULAS

$sql = "SELECT 
            m.ID_MATRICULA,
            CONCAT(a.NOMBRES,' ',a.APELLIDOS) AS ALUMNO,
            c.NOMBRE AS CURSO,
            m.FECHA_INSCRIPCION
        FROM MATRICULA m
        LEFT JOIN ALUMNO a ON m.ID_ALUMNO = a.ID_ALUMNO
        LEFT JOIN CURSO c ON m.ID_CURSO = c.ID_CURSO
        ORDER BY m.ID_MATRICULA DESC";

$stmt = $pdo->prepare($sql);
$stmt->execute();

$matriculas = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($matriculas);

break;


case '5':

$sql = "SELECT ID_ALUMNO, NOMBRES, APELLIDOS 
        FROM ALUMNO 
        WHERE ESTADO = 'A'
        ORDER BY NOMBRES ASC";

$stmt = $pdo->prepare($sql);
$stmt->execute();

$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

$html = '<option value="">Seleccionar Alumno</option>';

foreach ($resultado as $row) {
    $html .= '<option value="'.$row['ID_ALUMNO'].'">'
           .$row['NOMBRES'].' '.$row['APELLIDOS'].
           '</option>';
}

echo $html;

break;

case '6':

$sql = "SELECT ID_CURSO, NOMBRE 
        FROM CURSO 
        ORDER BY NOMBRE ASC";

$stmt = $pdo->prepare($sql);
$stmt->execute();

$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

$html = '<option value="">Seleccionar Curso</option>';

foreach ($resultado as $row) {
    $html .= '<option value="'.$row['ID_CURSO'].'">'
           .$row['NOMBRE'].
           '</option>';
}

echo $html;

break;


default:

echo json_encode([
    "exito" => false,
    "mensaje" => "Opción no válida."
]);

}

} catch (PDOException $e) {

echo json_encode([
    "exito" => false,
    "mensaje" => "Error BD: " . $e->getMessage()
]);

}

?>