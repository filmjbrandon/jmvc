<?php 

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
	$db_link_local = @mysql_connect('localhost','jmvc','jmvc') or die('could not connect - local'.chr(10));
	@mysql_select_db('jmvc') or die('could not select database - local'.chr(10));
}