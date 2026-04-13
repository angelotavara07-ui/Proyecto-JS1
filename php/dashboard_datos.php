<?php
header('Content-Type: application/json');

$host = 'localhost';
$db = 'MATRICULA';
$user = 'root';
$pass = '';

try {

    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $respuesta = [
        "kpis" => [],
        "graficos" => []
    ];

    // KPIs
    $stmt = $pdo->query("SELECT COUNT(*) FROM ALUMNO");
    $respuesta['kpis']['totalAlumnos'] = $stmt->fetchColumn();

    $stmt = $pdo->query("
        SELECT 
        COUNT(*) AS totalAulas,
        COALESCE(SUM(VACANTES_DISPONIBLES),0) AS vacantesDisp
        FROM AULA
    ");

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $respuesta['kpis']['totalAulas'] = $row['totalAulas'];
    $respuesta['kpis']['vacantesDisp'] = $row['vacantesDisp'];

    // GENERO
    $stmt = $pdo->query("
        SELECT GENERO, COUNT(*) AS cantidad 
        FROM ALUMNO 
        GROUP BY GENERO
    ");

    $respuesta['graficos']['genero'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // NIVELES
    $stmt = $pdo->query("
        SELECT NIVEL,
        SUM(VACANTES_TOTALES) AS totales,
        SUM(VACANTES_DISPONIBLES) AS disponibles
        FROM AULA
        GROUP BY NIVEL
    ");

    $respuesta['graficos']['niveles'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["exito" => true, "datos" => $respuesta]);

} catch (PDOException $e) {

    echo json_encode([
        "exito" => false,
        "mensaje" => "Error en el servidor"
    ]);
}
?>