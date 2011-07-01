<?php

/* this returns json */

$data['output'] = '<b>Bold Copy</b>';
$data['bogus'] = 'more code';

header('Content-type: text/json');
echo json_encode($data);
