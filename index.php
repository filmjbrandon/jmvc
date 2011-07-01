<?php
/* a bogus mvc-ish router for jmvc example */
/* no view, no models, lousy error handling, etc... */

/* basic config */
$server_url = 'http://localhost'; /* NO Trailing Slash */
$application_path = '/jmvc'; /* NO Trailing Slash */

/* done */
$complete_path = $server_url.$application_path.'/';
$parts = explode('/',$complete_path);
$controller_seg = count($parts) - 3;
$method_seg = $controller_seg + 1;
$params_seg = $controller_seg + 2;

require_once('application/libraries/functions.inc.php');

$uri = $_SERVER['REQUEST_URI'];
$segs = explode('/',$uri);
$segc = count($segs)-1;

$controller = (!empty($segs[$controller_seg])) ? $segs[$controller_seg] : 'index';
$controller = preg_replace('/[^a-z0-9_]/','',$controller);
$controller = str_replace('-','_',$controller);

$method = (!empty($segs[$method_seg])) ? $segs[$method_seg] : 'index';
$method = preg_replace('/[^a-z0-9_]/','',$method);
$method = str_replace('-','_',$method);

$params = array();
for ($idx = $params_seg;$idx <= $segc;$idx++)
  $params[] = $segs[$idx];

/* does this controller exist? */
$controller_file_path = 'application/controllers/'.$controller.'.php';
if (!file_exists($controller_file_path)) 
  die_hard('Controller '.$controller_file_path.' File Not Found');

require_once($controller_file_path);

$class = $controller.'_controller';

if (!class_exists($class)) 
  die_hard('Controller Class '.$class.' Not Found');

$controller_obj = new $class();

/* set up some stuff on the controller (super) object */
$controller_obj->domain = $server_url;
$controller_obj->folder = $application_path;
$controller_obj->path = $complete_path;
$controller_obj->controller = $controller;
$controller_obj->method = $method;

if ($method{0} == '_')
  die_hard('method '.$method.' protected');

if (!is_callable(array($controller_obj,$method)))
  die_hard('method '.$method.' in '.$class.' is not callable');

call_user_func_array(array($controller_obj,$method),$params);
