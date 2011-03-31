<?php
require_once('functions.inc.php');

$tests[] = array('session_start','Session Start');
$tests[] = array('session_uuid','Session uuid');
$tests[] = array('session_id','Session id');
$tests[] = array('session_regenerate_id','Session Regenerate Id');
$tests[] = array('session_regenerate_id2','Session Regenerate Id With Clear');
$tests[] = array('session_destroy','Session Destroy');
$tests[] = array('session_read','Session Read');
$tests[] = array('session_read_all','Session Read All');
$tests[] = array('session_write','Session Write');
$tests[] = array('uid','uid');

echo show($tests);