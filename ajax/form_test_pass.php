<?php
$output['mvc_model_valid'] = true;

$json = json_encode($output);

header('Content-type: text/json');
header('Content-type: application/json');

die($json);