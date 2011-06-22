<?php
class cookie_controller {

  function __construct() {}
  
  function index() {
    start_html();

    $tests[] = array('writecookie','Write to Cookie');
    $tests[] = array('readcookie','Read from Cookie');
    $tests[] = array('deletecookie','Delete Cookie');
    $tests[] = array('writelongterm','Write Long Term Cookie');
    
    echo show($tests);

    end_html();
  }
  
}