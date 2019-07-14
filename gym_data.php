<?php
include('config/config.php');

// set content type
header('Content-Type: application/json');

// init map
$scanner = new \Scanner\RDM();

if (empty($_POST['id'])) {
    http_response_code(400);
    die();
}
if (!validateToken($_POST['token'])) {
    http_response_code(400);
    die();
}


$id = $_POST['id'];

$p = $scanner->get_gym($id);

$p['token'] = refreshCsrfToken();

echo json_encode($p);
