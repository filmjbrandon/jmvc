<?php

function show($tests,$footer=true) {
  echo '<!DOCTYPE html>
  <html>
  <head>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
    <script type="text/javascript" src="../includes/jmvc/jquery.mvcboot.js"></script>
    <link rel="stylesheet" media="screen" type="text/css" href="../includes/style.css"/>
    <script language="Javascript" type="text/javascript">
      $(document).ready(function(){
        $.mvc();
      });
    </script>
  </head>
  <body>
  <p>The American College Form Handler 3 '.basename($_SERVER['PHP_SELF']).' Tester</p>';
  foreach ($tests as $test) {
    $data = (isset($test[2])) ? ' data-mvc=\''.json_encode($test[2]).'\'' : '';
    echo '<div class="button" id="'.$test[0].$data.'">';
    echo '<div class="column1">Test Named '.$test[1].'</div>';
    echo '<div class="column2">Action Named '.$test[0].'</div>';
    echo '</div>'.chr(10);
  }
  
  echo '<div id="output"></div>';
  echo '<div id="bogus"></div>';
  echo '<div><a href="../index.php">Home</a></div>';
  
  if (isset($_POST)) {
    echo '<pre>'.print_r($_POST,true).'</pre>';
  }
  
  if ($footer) echo '</body></html>';
}