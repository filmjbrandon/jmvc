#!/usr/bin/php
<?php
$argc = $_SERVER["argc"];
$argv = $_SERVER["argv"];

$dir = dirname(__FILE__).'/';
$filename = basename(__FILE__);
$n = chr(10);
$already_used = $names = $ids = array();
$output = $shark = '';

//error_reporting(0);

if ($argc < 2) die('Syntax: '.$filename.' http://www.url.com/controller/method'.$n);

$url = $argv[1];

echo 'Generating Controller For: '.$url.$n.'URL Parts'.$n;

$parts = explode('/',$url);
$parts_count = count($parts);

foreach ($parts as $value) echo $value.$n;

$controller = $parts[$parts_count-2];
$method = $parts[$parts_count-1];

$controller = (empty($controller)) ? 'index' : $controller;
$method = (empty($method)) ? 'index' : $method;

echo $n.'Controller: '.$controller.$n.'Method: '.$method.$n.$n;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$content = curl_exec($ch);
curl_close($ch);

$ids = explode('id="',$content);
array_shift($ids);

foreach ($ids as $name)
  if (!empty($name))
    $names[] = substr($name,0,strpos($name, '"'));

/* start jmvc controller class */

$output .= '/* '.$controller.' '.$method.' */'.$n;
$output .= 'var controller_'.$controller.'_method_'.$method.' = new function() {'.$n.$n;
$output .= '  this.__construct = function() {'.$n;
$output .= '    $.log(\'controller_'.$controller.'_method_'.$method.' init\');'.$n;
$output .= '  }'.$n.$n;

/* build classes for each id */

$output .= '/*'.$n.'  Additional Actions'.$n.'  click, focus, blur, change, select, submit'.$n.'  dblclick, hover, focusin, focusout'.$n.'  mousedown, mouseenter, mouseleave, mouseleave, mousemove, mouseout, mouseover, mouseup'.$n.'*/'.$n;
foreach ($names as $id) {
  $is_valid = (!preg_match('#^[a-zA-Z_$][0-9a-zA-Z_$]*$#', $id)) ? false : true;
  
  if ($is_valid) {
    if (array_key_exists($id,$already_used)) {
      echo ' in use id '.$id.$n;
    } else {
      echo '  valid id '.$id.$n;
      $output .= '  this.'.$id.' = new function() {'.$n;
      $output .= '    this.click = function() {'.$n;
      $output .= '      $.log(\''.$id.'.click action\');'.$n;
      $output .= '    };'.$n;
      $output .= '  };'.$n.$n;
      $already_used[$id] = $id;
    }
  } else {
    echo 'invalid id '.$id.$n;
  }
}

$output .= '}; /* close class */'.$n;

@mkdir($dir.'controllers');
@mkdir($dir.'controllers/'.$controller);
$file = $dir.'controllers/'.$controller.'/'.$method.'.js';
echo $n.$file.$n;
file_put_contents($file,$output);

echo 'Finished'.$n;
