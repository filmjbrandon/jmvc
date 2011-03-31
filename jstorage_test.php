<?php
require_once('functions.inc.php');

$tests[] = array('seta','Set Value A');
$tests[] = array('setb','Set Value B');
$tests[] = array('setc','Set Value C');
$tests[] = array('get_seta','Get Value');
$tests[] = array('get_default','Get With Default');
$tests[] = array('deletekey','Delete Key');
$tests[] = array('flush','Flush');
$tests[] = array('storageobj','Get Storage as RO Object');
$tests[] = array('storagesize','Storage Size');
$tests[] = array('index','Returns the used keys as an array');
$tests[] = array('storageavailable','Is Storage Available');
$tests[] = array('reinit','Reloads the data from browser storage');

echo show($tests);