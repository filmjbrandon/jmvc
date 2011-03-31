<?php
error_reporting(0);

header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Cache-Control: no-cache');
header('Pragma: no-cache');
header('Content-type: text/javascript');

$uri = $_SERVER['REQUEST_URI'];
$segs = explode('/',$uri);
$segc = count($segs);

$model_file = basename($segs[$segc-1],'.js').'.php';

if (file_exists($model_file)) {
  $output = file_get_contents($model_file);
} else {
  $output = '{}';
}

die($output);