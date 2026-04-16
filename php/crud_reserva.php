<?php
header('Content-Type: application/json');

$host = 'localhost';
$db = 'MATRICULA';
$user = 'root';
$pass = '';

try {

$pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user,$pass);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Recibir qué acción queremos hacer
$opcion = $_POST['opcion'] ?? '';

switch ($opcion) {

case '1': // CREAR REGISTRO

$sql = "INSERT INTO RESERVA 
(ID_ALUMNO, ID_AULA, CODIGO_PAGO, ESTADO_PAGO) 
VALUES (?, ?, ?, ?)";

$stmt = $pdo->prepare($sql);

$stmt->execute([
$_POST['id_alumno'],
$_POST['id_aula'],
$_POST['codigo_pago'],
$_POST['estado_pago']
]);

echo json_encode([
"exito" => true,
"mensaje" => "Reserva registrada correctamente."
]);

break;


case '2': // EDITAR REGISTRO

$sql = "UPDATE RESERVA SET 
ID_ALUMNO=?,
ID_AULA=?,
CODIGO_PAGO=?,
ESTADO_PAGO=?
WHERE ID_RESERVA=?";

$params = [
$_POST['id_alumno'],
$_POST['id_aula'],
$_POST['codigo_pago'],
$_POST['estado_pago'],
$_POST['id_reserva']
];

$stmt = $pdo->prepare($sql);
$stmt->execute($params);

echo json_encode([
"exito" => true,
"mensaje" => "Reserva actualizada correctamente."
]);

break;


case '3': // ELIMINAR REGISTRO

$sql = "DELETE FROM RESERVA WHERE ID_RESERVA = ?";
$stmt = $pdo->prepare($sql);

$stmt->execute([$_POST['id_reserva']]);

echo json_encode([
"exito" => true,
"mensaje" => "Reserva eliminada."
]);

break;


case '4':

$sql = "SELECT 
r.ID_RESERVA,
CONCAT(a.NOMBRES,' ',a.APELLIDOS) AS ALUMNO,
CONCAT(au.NIVEL,' ',au.GRADO,'° ',au.SECCION) AS AULA,
r.CODIGO_PAGO,
r.FECHA_RESERVA,
r.ESTADO_PAGO
FROM RESERVA r
LEFT JOIN ALUMNO a ON r.ID_ALUMNO = a.ID_ALUMNO
LEFT JOIN AULA au ON r.ID_AULA = au.ID_AULA
ORDER BY r.ID_RESERVA DESC";

$stmt = $pdo->prepare($sql);
$stmt->execute();

$reservas = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($reservas);

break;case '4':

$sql = "SELECT 
r.ID_RESERVA,
CONCAT(a.NOMBRES,' ',a.APELLIDOS) AS ALUMNO,
CONCAT(au.NIVEL,' ',au.GRADO,'° ',au.SECCION) AS AULA,
r.CODIGO_PAGO,
r.FECHA_RESERVA,
r.ESTADO_PAGO
FROM RESERVA r
LEFT JOIN ALUMNO a ON r.ID_ALUMNO = a.ID_ALUMNO
LEFT JOIN AULA au ON r.ID_AULA = au.ID_AULA
ORDER BY r.ID_RESERVA DESC";

$stmt = $pdo->prepare($sql);
$stmt->execute();

$reservas = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($reservas);

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

$sql = "SELECT 
ID_AULA,
CONCAT(NIVEL,' ',GRADO,'° ',SECCION) AS AULA
FROM AULA
ORDER BY NIVEL, GRADO, SECCION";

$stmt = $pdo->prepare($sql);
$stmt->execute();

$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

$html = '<option value="">Seleccionar Aula</option>';

foreach ($resultado as $row) {

$html .= '<option value="'.$row['ID_AULA'].'">'
       .$row['AULA'].
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