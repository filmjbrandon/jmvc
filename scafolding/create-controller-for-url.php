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

$parts = explode('/',$url);
$parts_count = count($parts);

display('URL Parts',$parts);

$controller = $parts[$parts_count-2];
$method = $parts[$parts_count-1];

echo 'Controller: '.$controller.$n;
echo 'Method: '.$method.$n.$n;

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

$output  = 'var controller_'.$controller.'_method_'.$method.' = new function() {'.$n.$n;
$output .= '  this.__construct = function() {'.$n;
$output .= '    $.log(\'controller_'.$controller.'_method_'.$method.' init\');'.$n;
$output .= '  }'.$n.$n;

foreach ($names as $id) {
  $is_valid = (!preg_match('#^[a-zA-Z_$][0-9a-zA-Z_$]*$#', $id)) ? false : true;

  echo '  valid id '.$id.$n;
  
  if ($is_valid) {
    $output .= '  this.'.$id.' = new function() {'.$n;
    $output .= '    this.click = function() {'.$n;
    $output .= '      $.log(\''.$id.'.click action\');'.$n;
    $output .= '    };'.$n;
    $output .= '  };'.$n.$n;
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

function display($header,$ary) {
  echo $header.chr(10);
  foreach ((array)$ary as $value) {
    echo $value.chr(10);
  }
  echo chr(10);
}
