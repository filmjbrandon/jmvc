<?php

$data['isgood'] = true;

$data['post'] = $_POST;
$data['get'] = $_GET;

die(json_encode($data));