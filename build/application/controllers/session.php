<?php
class session_controller {

  function __construct() {}
  
  function index() {
    start_html();

    show_header();

    $tests[] = array('session_start','Session Start');
    $tests[] = array('session_uuid','Session uuid');
    $tests[] = array('session_id','Session id');
    $tests[] = array('session_writedm','Session Write Don Myers');
    $tests[] = array('session_writetm','Session Write Tyson Myers');
    $tests[] = array('session_read','Session Read');
    $tests[] = array('session_read_all','Session Read All');
    $tests[] = array('session_regenerate_id','Session Regenerate Id');
    $tests[] = array('session_regenerate_id2','Session Regenerate Id With Clear');
    $tests[] = array('session_destroy','Session Destroy');
    $tests[] = array('uid','uid');
    
    show_left_block($tests);
    show_right_block();
    
    show_footer();

    end_html();
  }
}