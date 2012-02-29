<?php
$data['mvc_model_valid'] = (mt_rand(1,100) > 50) ? true : false;

/* check against your backend models / code / etc.. */

$data['foobar'] = 'Yes Please!';
$data['bogus'] = 'FooBar!'; /* there is a div with the id of bogus this will be auto filled in! */

header('Content-type: text/json');
header('Content-type: application/json');

die(json_encode($data));