<?php
$name=$_POST['name']??'';
if(empty($name) || !is_string($name)) {
    http_response_code(400);
    die("missing POST parameter name!");
}
'Привет ' . $name . '!';
?>
