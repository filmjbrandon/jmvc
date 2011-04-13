<?php
require_once('../includes/functions.inc.php');

$tests[] = array('read_model','Read Model');
$tests[] = array('read_model2','Read Model with id');
$tests[] = array('read_model3','Read All with Name Contains Laurie');
$tests[] = array('insert_model','Insert Model');
$tests[] = array('update_model','Update Model');
$tests[] = array('update_model2','Update Many Models');
$tests[] = array('delete_model','Delete Model');
$tests[] = array('model_exists','Model Exists');
$tests[] = array('form2model','Form 2 Model');

echo show($tests);