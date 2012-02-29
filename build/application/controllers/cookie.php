<?php
class cookie_controller {

  function __construct() {}
  
  function index() {
    start_html();

    show_header();

    $tests[] = array('writecookie','Write to Cookie');
    $tests[] = array('readcookie','Read from Cookie');
    $tests[] = array('deletecookie','Delete Cookie');
    $tests[] = array('writelongterm','Write Long Term Cookie');
    
    show_left_block($tests);
    show_right_block();
    
    show_footer();

    end_html();
  }
  
}