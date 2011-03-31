<?php

function show($tests,$footer=true) {
echo '<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>Title Here</title>
    <link rel="shortcut icon" href="assets/img/favicon.ico" type="image/x-icon"/>
    <script type="text/javascript" src="includes/js/jquery-1.5.min.js"></script>
    <script type="text/javascript" src="includes/js/jquery.mvcboot.js"></script>
    <link rel="stylesheet" media="screen" type="text/css" href="assets/css/site.css"/>
    <script language="Javascript" type="text/javascript">
    $(document).ready(function(){
      $.mvc();
    });
    </script>
  </head>
  <body>
    <h2>The American College Form Handler 3 '.basename($_SERVER['PHP_SELF']).' Tester</h2>';

  foreach ($tests as $test) {
    $data = (isset($test[2])) ? ' data-mvc=\''.json_encode($test[2]).'\'' : '';
    echo '<div class="button" id="'.$test[0].$data.'">';
    echo '<span class="column1">Test Named '.$test[1].'</span>';
    echo '<span class="column2">Action Named '.$test[0].'</span>';
    echo '</div>'.chr(10);
  }
  
  echo '<div id="output"></div>';
  echo '<div id="bogus"></div>';
  echo '<div><a href="index.php">Home</a></div>';
  if ($footer) echo '</body></html>';
}