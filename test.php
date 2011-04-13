<?php

$payload = array('id'=>123,'name'=>'Don','_junk'=>'junk');
$defaults = array('id','name','age');
$defaults = array_fill_keys ($defaults,'');

$record = array_diff_key($defaults,$payload) + array_intersect_key($payload,$defaults);

print_r($record);


$payload = array('id'=>'','name'=>'cups','age'=>'');
$record = array('id'=>123,'name'=>'Don','age'=>41);

$r = array_merge($payload,$record);

print_r($r);