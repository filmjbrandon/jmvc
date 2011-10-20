<?php
class ajax_controller {

  function __construct() {}
  
  function index() {
    header('Content-type: text/json');

    $data['name'] = 'Don Myers';
    $data['age'] = 23;
    
    die(json_encode($data));
  }
  
}