<?php
require_once('../includes/functions.inc.php');

$tests[] = array('read_model','Read Model');
$tests[] = array('upsert_model','Upsert Model');
$tests[] = array('update_model','Update Model');
$tests[] = array('delete_model','Delete Model');
$tests[] = array('model_exists','Model Exists');
$tests[] = array('form2model','Form 2 Model');

echo show($tests);