<?php
require_once('functions.inc.php');

$tests[] = array('writecookie','Write to Cookie');
$tests[] = array('readcookie','Read from Cookie');
$tests[] = array('deletecookie','Delete Cookie');
$tests[] = array('writelongterm','Write Long Term Cookie');

echo show($tests);