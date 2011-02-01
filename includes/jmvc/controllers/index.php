<?php
error_reporting(0);

$mvc_controller_named = 'controller';
$mvc_method_named = 'method';
$mvc_constructor_named = '__construct';

$parts = explode('/',$_SERVER['REQUEST_URI']);

$filename = array_pop($parts);
$folder = array_pop($parts);

$controller_file = $folder.'/'.$filename;

header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Cache-Control: no-cache');
header('Pragma: no-cache');
header('Content-type: text/javascript');

if (file_exists($controller_file))
  $output = file_get_contents($controller_file);
else
  $output = "var ".$mvc_controller_named."_".$folder."_".$mvc_method_named."_".basename($filename,'.js')." = new function() { this.".$mvc_constructor_named." = function() { $.log('bogus ".$folder."/".basename($filename,'.js')." constructor'); } };";

die($output);