<?php

function start_html() {
  echo '<!DOCTYPE html>
  <html>
  <head>
    <link rel="stylesheet" media="screen" type="text/css" href="application/libraries/application.css"/>
    <script type="text/javascript" src="jquery/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="jmvc/jquery.mvcboot.js"></script>
    <script language="Javascript" type="text/javascript" src="application/libraries/application.js"></script>

    <script language="Javascript" type="text/javascript" src="jmvc/includes/jquery.mvc.js"></script>
  </head>
  <body>';
}

function end_html() {
  echo '</body></html>';
}

function show_header($extra='') {
  $super = &get_super();
  echo '<p><a class="link" href="'.$super->path.'">Home</a></p>';
  echo '<p>'.basename($_SERVER['PHP_SELF']).' index.js -- controller_'.basename($_SERVER['PHP_SELF']).'_method_index</p>';
  echo $extra;
}

function show_left_block($tests,$extra='') {
  echo '<div id="left_block">';
  echo '<div class="heading">Description / Javascript Action</div>';
  foreach ((array)$tests as $test) {
    $data = (isset($test[2])) ? ' data-mvc=\''.json_encode($test[2]).'\'' : '';
    echo '<div class="button column" id="'.$test[0].$data.'">';
    echo '<div class="column1">'.$test[1].' / '.$test[0].'</div>';
    echo '</div>'.chr(10);
  }
  echo '<div id="output"></div>';
  if (count($_POST) > 0) {
    echo '<div id="posted">Posted<br>';
    echo '<pre>'.print_r($_POST,true).'</pre>';
    echo '</div>';
  }
  echo $extra;
  echo '</div>';
}

function show_right_block($extra='') {
  echo '<div id="right_block">';
  echo '<div id="outputblock"></div>';
  echo $extra;
  echo '</div>';
  echo '<div class="log"></div>';
}

function show_footer($extra='') {
  echo '<script language="Javascript" type="text/javascript">
  $(document).ready(function() {
    clearDebug();
  });</script>';
  echo $extra;
}

function die_hard($why) {
  die('<pre>Die Hard: '.$why.'</pre>');
}

function &get_super() {
  global $controller_obj;
  return $controller_obj;
}

function logger($v,$name) {
  global $debug_logs;
  
  if (!$debug_logs) return;

  if ($log_handle = fopen($name.'.log','a')) {
    fwrite($log_handle,$v.chr(10));
    fclose($log_handle);
  }
}

function dbconnect() {
	/* connect to your db however you like */
	$db_link_local = @mysql_connect('localhost','root','stevejobs') or die('could not connect - local'.chr(10));
	@mysql_select_db('rest_test') or die('could not select database - local'.chr(10));
}
