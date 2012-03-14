<?php
/* 
this is really to stop your browser from requesting a file (controller) the doesn't exists and recieveing a (404)

if you don't mind the 404 then this isn't needed
if there is no controller one isn't loaded
*/

error_reporting(0);

/*
These need to match the mvc.boot config settings
  mvc.controller_named
  mvc.method_named
  mvc.constructor_named
*/

$mvc_controller_named = 'controller';
$mvc_method_named = 'method';
$mvc_constructor_named = '__construct';

$parts = explode('/',$_SERVER['REQUEST_URI']);

$f = array_pop($parts);
$ff = explode('.',$f);
$filename = $ff[0];

$folder = array_pop($parts);

$controller_file = $folder.'/'.$filename;

header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Cache-Control: no-cache');
header('Pragma: no-cache');
header('Content-type: text/javascript');

if (file_exists($controller_file)) {
  $output = file_get_contents($controller_file);
} else {
  $output = "var ".$mvc_controller_named."_".$folder."_".$mvc_method_named."_".$filename." = new function() { this.".$mvc_constructor_named." = function() { $.log('bogus ".$folder."/".basename($filename,'.js')." constructor'); } };";
}

die($output);