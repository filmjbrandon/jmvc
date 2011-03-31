#!/usr/bin/php
<?php
$argc = $_SERVER["argc"];
$argv = $_SERVER["argv"];

$dir = dirname(__FILE__).'/';
$filename = basename(__FILE__);
$n = chr(10);

//error_reporting(0);

if ($argc < 2) die('Syntax: '.$filename.' http://www.url.com/controller/method'.$n);

$url = $argv[1];

echo 'Generating Controller For: '.$url.$n;

/* figure out the Controller & Method */
$controller_start = (isset($argv[2])) ? $argv[2] : 1;

$parts = explode('/',$url);

array_shift($parts);
array_shift($parts);

print_r($parts);

$controller = $parts[$controller_start];
$method = $parts[$controller_start+1];

echo 'Controller: '.$controller.$n;
echo 'Method: '.$method.$n;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$content = curl_exec($ch);
curl_close($ch);

$test = explode('id="',$content);
array_shift($test);

foreach ($test as $name) {
  $shark = substr($name,0,strpos($name, '"'));
  if (!empty($shark)) $names[] = $shark;
}

print_r($names);

$output  = 'var controller_'.$controller.'_method_'.$method.' = new function() {'.$n.$n;
$output .= '  this.__construct = function() {'.$n;
$output .= '    $.log(\'controller_'.$controller.'_method_'.$method.' init\');'.$n;
$output .= '  }'.$n.$n;

foreach ($names as $id) {
  $is_valid = (!preg_match('#^[a-zA-Z_$][0-9a-zA-Z_$]*$#', $id)) ? false : true;
  
  if ($is_valid) {
    $output .= '  this.'.$id.' = new function() {'.$n;
    $output .= '    this.click = function() {'.$n;
    $output .= '      $.log(\''.$id.'.click action\');'.$n;
    $output .= '    };'.$n;
    $output .= '  };'.$n.$n;
  } else {
    echo $id.' is a invalid javascript variable name'.$n;
  }
}

$output .= '}; /* close class */'.$n;

file_put_contents($dir.$method.'.js',$output);

echo 'Finished'.$n;
