<?php

function show($tests) {
  echo '<h2>The American College Form Handler 3 '.basename($_SERVER['PHP_SELF']).' Tester</h2><pre style="font-size: 11px;">';

  foreach ($tests as $test) {
    $data = '';
    if (isset($test[2]))
      $data = ' data-mvc=\''.json_encode($test[2]).'\'';
  
    echo '<div id="'.$test[0].$data.'">';
    $x = 'Test Named '.$test[1];
    $y = 'Action Named '.$test[0];
    
    echo str_pad($x,84,' ',STR_PAD_RIGHT);
    echo str_pad($y,1,' ',STR_PAD_RIGHT);
    
    echo '</div>'.chr(10);
  }
  
  echo '<div id="output"></div><a href="index.php">Home</a>';
}