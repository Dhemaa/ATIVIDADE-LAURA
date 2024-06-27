<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "xuitter_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];

    if ($action === 'create') {
        $texto = $conn->real_escape_string($_POST['texto']);
        $sql = "INSERT INTO publicacoes (texto) VALUES ('$texto')";
        $conn->query($sql);
    } elseif ($action === 'like') {
        $id = intval($_POST['id']);
        $sql = "UPDATE publicacoes SET curtida = !curtida WHERE id = $id";
        $conn->query($sql);
    } elseif ($action === 'delete') {
        $id = intval($_POST['id']);
        $sql = "DELETE FROM publicacoes WHERE id = $id";
        $conn->query($sql);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM publicacoes ORDER BY data_criacao DESC";
    $result = $conn->query($sql);

    $posts = array();
    while ($row = $result->fetch_assoc()) {
        $posts[] = $row;
    }
    echo json_encode($posts);
}

$conn->close();
?>
